import type { WordRow } from "../api/client.ts";
import type { Monster } from "./monster.ts";
import { spawnMonster } from "./monster.ts";
import { pickWord } from "./word_manager.ts";
import { killScore } from "./scoring.ts";

export type GamePhase =
  | "announce"
  | "playing"
  | "interwave"
  | "paused"
  | "gameover"
  | "ending";

export type GameMode = "story" | "endless";

const FORTRESS_X = 44;
const ANNOUNCE_SEC = 3;
const INTERWAVE_SEC = 5;
const INITIAL_HP = 3;
const AIM_TOLERANCE_PX = 88;
const AIM_Y_TOLERANCE_PX = 46;

/** Lane band center as fraction of playfield height (matches UI `laneTopPct`). */
export function laneCenterYpx(lane: number, playHeight: number): number {
  return ((18 + lane * 16) / 100) * playHeight;
}

export type GameSnapshot = {
  phase: GamePhase;
  phaseTimer: number;
  announceLabel: string;
  fortressHp: number;
  maxHp: number;
  waveInStage: number;
  waveGlobal: number;
  stage: number;
  mode: GameMode;
  monsters: Monster[];
  inputBuffer: string;
  targetId: string | null;
  hoverTargetId: string | null;
  crosshairX: number;
  /** Pixels from top of playfield (center of reticle). */
  crosshairY: number;
  score: number;
  combo: number;
  totalTyped: number;
  correctTyped: number;
  missesThisWave: number;
  paused: boolean;
  reachedWave: number;
  killTimes: number[];
  pendingSpawns: number;
  totalWavesCleared: number;
  lastWaveWasPerfect: boolean;
};

function maxConcurrent(W: number): number {
  return Math.min(8, Math.ceil(W / 5) + 1);
}

function spawnIntervalSec(W: number): number {
  return Math.max(0.8, 3.0 - W * 0.05);
}

function monstersInWave(W: number): number {
  return Math.min(40, 6 + W * 2);
}

export class GameEngine {
  mode: GameMode;
  stage: number;
  words: WordRow[];
  readonly startTime = Date.now();

  phase: GamePhase = "announce";
  phaseTimer = ANNOUNCE_SEC;
  announceLabel = "";

  fortressHp = INITIAL_HP;
  maxHp = INITIAL_HP;

  waveInStage = 1;
  waveGlobal = 0;

  monsters: Monster[] = [];
  spawnTimer = 0;
  pendingSpawns = 0;
  bossSpawnedThisWave = false;

  inputBuffer = "";
  targetId: string | null = null;

  crosshairX = 400;
  crosshairY = 200;

  score = 0;
  combo = 0;
  totalTyped = 0;
  correctTyped = 0;
  missesThisWave = 0;

  paused = false;

  killTimes: number[] = [];
  totalWavesCleared = 0;
  lastWaveWasPerfect = false;

  /** 撃破演出用（タイピングは step 外で消えるため差分検出では拾えない） */
  private defeatFxQueue: Monster[] = [];

  private needBoss = false;

  /** 直近で倒した敵のスナップ（位置・見た目用）。取り出し後は空になる。 */
  pullDefeatFxMonsters(): Monster[] {
    const out = this.defeatFxQueue;
    this.defeatFxQueue = [];
    return out;
  }

  constructor(mode: GameMode, startStage: number, words: WordRow[]) {
    this.mode = mode;
    this.stage = mode === "story" ? startStage : 1;
    this.words = words;
    this.beginAnnounce();
  }

  private pickSpawnLane(): number {
    const counts = [0, 0, 0, 0];
    for (const m of this.monsters) counts[m.lane] += 1;
    let best = 0;
    for (let i = 1; i < 4; i++) {
      if (counts[i] < counts[best]) best = i;
    }
    return best;
  }

  monsterUnderCrosshair(playWidth: number, playHeight: number): Monster | null {
    const cx = this.crosshairX;
    const cy = this.crosshairY;
    let best: Monster | null = null;
    let bestD = 1e9;
    for (const m of this.monsters) {
      const my = laneCenterYpx(m.lane, playHeight);
      const dx = Math.abs(m.x - cx);
      const dy = Math.abs(cy - my);
      if (dx < AIM_TOLERANCE_PX && dy < AIM_Y_TOLERANCE_PX) {
        const d = dx + dy * 1.1;
        if (d < bestD) {
          best = m;
          bestD = d;
        }
      }
    }
    return best;
  }

  hoverTargetId(playWidth: number, playHeight: number): string | null {
    if (this.targetId !== null) return null;
    return this.monsterUnderCrosshair(playWidth, playHeight)?.id ?? null;
  }

  /** Smooth aim: deltaX / deltaY in pixels. */
  moveCrosshair(deltaX: number, deltaY: number, playWidth: number, playHeight: number): void {
    if (this.phase !== "playing" || this.paused) return;
    if (this.targetId !== null) return;
    const minX = FORTRESS_X + 56;
    const maxX = Math.max(minX + 40, playWidth - 32);
    const marginY = Math.max(20, playHeight * 0.06);
    this.crosshairX = Math.max(minX, Math.min(maxX, this.crosshairX + deltaX));
    this.crosshairY = Math.max(marginY, Math.min(playHeight - marginY, this.crosshairY + deltaY));
  }

  tryBeginTyping(playWidth: number, playHeight: number): boolean {
    if (this.phase !== "playing" || this.paused) return false;
    if (this.targetId !== null) return false;
    const m = this.monsterUnderCrosshair(playWidth, playHeight);
    if (!m) return false;
    this.targetId = m.id;
    this.inputBuffer = "";
    return true;
  }

  cancelTyping(): void {
    this.inputBuffer = "";
    this.targetId = null;
  }

  snapshot(playWidth: number, playHeight: number): GameSnapshot {
    return {
      phase: this.phase,
      phaseTimer: this.phaseTimer,
      announceLabel: this.announceLabel,
      fortressHp: this.fortressHp,
      maxHp: this.maxHp,
      waveInStage: this.waveInStage,
      waveGlobal: this.waveGlobal,
      stage: this.stage,
      mode: this.mode,
      monsters: this.monsters.map((m) => ({ ...m })),
      inputBuffer: this.inputBuffer,
      targetId: this.targetId,
      hoverTargetId: this.hoverTargetId(playWidth, playHeight),
      crosshairX: this.crosshairX,
      crosshairY: this.crosshairY,
      score: this.score,
      combo: this.combo,
      totalTyped: this.totalTyped,
      correctTyped: this.correctTyped,
      missesThisWave: this.missesThisWave,
      paused: this.paused,
      reachedWave: this.waveGlobal,
      killTimes: [...this.killTimes],
      pendingSpawns: this.pendingSpawns,
      totalWavesCleared: this.totalWavesCleared,
      lastWaveWasPerfect: this.lastWaveWasPerfect,
    };
  }

  togglePause(): void {
    if (this.phase !== "playing" && this.phase !== "paused") return;
    if (this.phase === "paused") {
      this.phase = "playing";
      this.paused = false;
    } else {
      this.phase = "paused";
      this.paused = true;
    }
  }

  private beginAnnounce(): void {
    this.waveGlobal += 1;
    this.needBoss = this.waveGlobal > 0 && this.waveGlobal % 5 === 0;
    this.bossSpawnedThisWave = false;
    if (this.mode === "story") {
      this.announceLabel = `WAVE ${this.waveInStage} / 10 — STAGE ${this.stage}`;
    } else {
      this.announceLabel = `WAVE ${this.waveGlobal}`;
    }
    this.phase = "announce";
    this.phaseTimer = ANNOUNCE_SEC;
    this.inputBuffer = "";
    this.targetId = null;
    this.missesThisWave = 0;
  }

  private startPlaying(playWidth: number, playHeight: number): void {
    this.phase = "playing";
    this.paused = false;
    const W = this.waveGlobal;
    this.pendingSpawns = monstersInWave(W);
    this.spawnTimer = 0;
    this.monsters = [];
    this.crosshairX = Math.min(playWidth * 0.62, playWidth - 80);
    this.crosshairY = laneCenterYpx(1, playHeight);
    this.targetId = null;
    this.inputBuffer = "";
    this.spawnNext(playWidth);
  }

  private spawnNext(playWidth: number): void {
    if (this.pendingSpawns <= 0) return;
    const W = this.waveGlobal;
    if (this.monsters.length >= maxConcurrent(W)) return;

    const isBoss = this.needBoss && !this.bossSpawnedThisWave;
    const word = pickWord(this.words, W);
    const lane = this.pickSpawnLane();
    const m = spawnMonster(word, playWidth, W, isBoss, lane);
    this.monsters.push(m);
    this.pendingSpawns -= 1;
    if (isBoss) this.bossSpawnedThisWave = true;
    this.spawnTimer = spawnIntervalSec(W);
  }

  keyDown(key: string, now: number, playWidth: number): void {
    if (this.phase !== "playing" || this.paused) return;
    if (!this.targetId) return;
    if (key.length !== 1) return;
    const ch = key.toLowerCase();
    if (ch < "a" || ch > "z") return;

    const mon = this.monsters.find((m) => m.id === this.targetId);
    if (!mon) {
      this.targetId = null;
      this.inputBuffer = "";
      return;
    }

    const next = this.inputBuffer + ch;
    this.totalTyped += 1;
    const word = mon.word.toLowerCase();

    if (!word.startsWith(next)) {
      this.missesThisWave += 1;
      this.combo = 0;
      this.inputBuffer = "";
      return;
    }

    if (word === next) {
      this.correctTyped += 1;
      this.applyKill(mon, now);
      this.inputBuffer = "";
      this.targetId = null;
      return;
    }

    this.correctTyped += 1;
    this.inputBuffer = next;
  }

  private applyKill(m: Monster, now: number): void {
    if (m.isBoss && m.hp > 1) {
      const idx = this.monsters.findIndex((x) => x.id === m.id);
      if (idx >= 0) {
        this.monsters[idx] = { ...m, hp: m.hp - 1 };
      }
      return;
    }

    const isBoss = m.isBoss;
    const len = m.word.length;
    this.score += killScore(len, this.combo, isBoss, m.isRare);
    this.combo += 1;
    this.killTimes.push(now);
    this.killTimes = this.killTimes.filter((t) => now - t <= 5000);

    this.defeatFxQueue.push({ ...m });
    this.monsters = this.monsters.filter((x) => x.id !== m.id);
  }

  step(dt: number, now: number, playWidth: number, playHeight: number): void {
    if (this.phase === "gameover" || this.phase === "ending") return;

    if (this.phase === "announce") {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) this.startPlaying(playWidth, playHeight);
      return;
    }

    if (this.phase === "interwave") {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) {
        this.beginAnnounce();
      }
      return;
    }

    if (this.phase === "paused") return;

    if (this.phase !== "playing") return;

    if (this.targetId && !this.monsters.some((m) => m.id === this.targetId)) {
      this.targetId = null;
      this.inputBuffer = "";
    }

    this.spawnTimer -= dt;
    while (
      this.pendingSpawns > 0 &&
      this.spawnTimer <= 0 &&
      this.monsters.length < maxConcurrent(this.waveGlobal)
    ) {
      this.spawnNext(playWidth);
    }

    const left: Monster[] = [];
    for (const m of this.monsters) {
      const nx = m.x - m.speed * dt;
      if (nx <= FORTRESS_X) {
        this.fortressHp -= 1;
        this.combo = 0;
        if (m.id === this.targetId) {
          this.targetId = null;
          this.inputBuffer = "";
        }
        this.defeatFxQueue.push({ ...m, x: Math.max(FORTRESS_X + 4, nx) });
        if (this.fortressHp <= 0) {
          this.phase = "gameover";
          return;
        }
        continue;
      }
      left.push({ ...m, x: nx });
    }
    this.monsters = left;

    if (this.pendingSpawns <= 0 && this.monsters.length === 0) {
      this.totalWavesCleared += 1;
      this.lastWaveWasPerfect = this.missesThisWave === 0;
      if (this.mode === "story" && this.waveInStage === 10) {
        if (this.stage < 5) {
          this.stage += 1;
          this.waveInStage = 1;
        } else {
          this.phase = "ending";
          return;
        }
      } else {
        this.waveInStage += 1;
      }
      this.phase = "interwave";
      this.phaseTimer = INTERWAVE_SEC;
    }
  }
}

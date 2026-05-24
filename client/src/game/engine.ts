import type { BossRushDifficulty, Monster } from "./monster.ts";
import { monsterWorldY, spawnBossRushMonster, spawnMonster } from "./monster.ts";
import {
  advanceBullet,
  bulletOutOfField,
  spawnBurstRing,
  spawnPlayerVolley,
  stepBulletHoming,
  tryBulletHits,
} from "./bullet.ts";
import {
  advanceEnemyBullet,
  BOSS_BURGER_CHILD_BULLET_SPEED,
  BOSS_BURGER_EIGHT_WAY_INTERVAL_SEC,
  boss1BurgerSpawnIntervalSec,
  enemyBulletHitsPlayer,
  enemyBulletOutOfField,
  spawnBossBurgerBullet,
  spawnEightWayEnemyBurst,
  spawnEnemyBulletTowardPlayer,
  type EnemyBullet,
} from "./enemy_bullet.ts";
import { laneCenterYpx } from "./lanes.ts";
import { killScore } from "./scoring.ts";
import {
  applyUpgradePick,
  bulletSpeedMultiplier,
  burstBulletCount,
  emptyUpgradeStacks,
  fireCooldownSec,
  pickUpgradeChoices,
  scoreBoostMultiplier,
  type UpgradeId,
  type UpgradeStacks,
} from "./upgrades.ts";
import {
  MONSTER_DESPAWN_X,
  PLAYFIELD_HEIGHT,
  PLAYFIELD_WIDTH,
  STORY_STAGE_DIFFICULTY_OFFSET,
} from "./playfield.ts";
import { pickStageBackground, STAGE_BACKGROUND_URLS } from "./stage_backgrounds.ts";

export type GamePhase =
  | "announce"
  | "playing"
  | "wave_clear"
  | "upgrade_select"
  | "interwave"
  | "paused"
  | "game_over_banner"
  | "gameover"
  | "ending";

export type GameMode = "story" | "endless" | "boss_rush";

export type { BossRushDifficulty } from "./monster.ts";

export { laneCenterYpx } from "./lanes.ts";
export { PLAYFIELD_WIDTH, PLAYFIELD_HEIGHT } from "./playfield.ts";
import type { Bullet } from "./bullet.ts";

export type GameSnapshot = {
  phase: GamePhase;
  phaseTimer: number;
  announceLabel: string;
  playerHp: number;
  maxHp: number;
  waveInStage: number;
  waveGlobal: number;
  stage: number;
  mode: GameMode;
  /** BOSS RUSH 時のみ */
  bossRushBossId?: number;
  bossRushDifficulty?: BossRushDifficulty;
  monsters: Monster[];
  bullets: Bullet[];
  enemyBullets: EnemyBullet[];
  crosshairX: number;
  crosshairY: number;
  score: number;
  combo: number;
  shotsFired: number;
  hitsLanded: number;
  paused: boolean;
  reachedWave: number;
  killTimes: number[];
  pendingSpawns: number;
  totalWavesCleared: number;
  lastWaveWasPerfect: boolean;
  upgradeChoices: UpgradeId[];
  upgradeStacks: UpgradeStacks;
  upgradeFlashSec: number;
  pendingEndingAfterBreak: boolean;
  /** 現在ウェーブのステージ背景（直前ウェーブと同じ URL にはならない） */
  stageBackgroundUrl: string;
  /** 被弾後の残り無敵時間（秒）。0 で通常 */
  playerIframesSec: number;
};

const ANNOUNCE_SEC = 3;
const WAVE_CLEAR_SEC = 0.95;
const GAME_OVER_BANNER_SEC = 0.95;
/** 次ウェーブへ（カウント表示はなし。短い間のみ） */
const INTERWAVE_SEC = 0.08;
const INITIAL_HP = 3;
/** BOSS RUSH モードの自機 ♥（通常モードは INITIAL_HP） */
const BOSS_RUSH_PLAYER_HP = 7;
const UPGRADE_FLASH_SEC = 0.55;
/** 被弾直後、連続ヒットを防ぐ無敵時間 */
const PLAYER_IFRAMES_AFTER_HIT = 1.85;

const PLAYER_MARGIN_X = 36;
const PLAYER_MARGIN_Y = 36;

function maxConcurrent(W: number): number {
  return Math.min(8, Math.ceil(W / 5) + 1);
}

function spawnIntervalSec(W: number): number {
  return Math.max(0.8, 3.0 - W * 0.05);
}

function monstersInWave(W: number): number {
  return Math.min(40, 6 + W * 2);
}

function enemyBulletSpeed(difficultyW: number): number {
  return Math.min(420, 260 + difficultyW * 5);
}

/** boss1 の自機狙い弾（他敵より少し遅め） */
const BOSS1_AIMED_BULLET_MULT = 0.88;
/** boss1 大型特殊弾の速さ = 基準弾速 × この倍率 */
const BOSS1_BURGER_SPEED_MULT = 0.28;

export class GameEngine {
  mode: GameMode;
  stage: number;
  readonly startTime = Date.now();

  phase: GamePhase = "announce";
  phaseTimer = ANNOUNCE_SEC;
  announceLabel = "";

  stageBackgroundUrl = STAGE_BACKGROUND_URLS[0] ?? "";

  playerHp = INITIAL_HP;
  maxHp = INITIAL_HP;

  waveInStage = 1;
  waveGlobal = 0;

  monsters: Monster[] = [];
  bullets: Bullet[] = [];
  enemyBullets: EnemyBullet[] = [];
  spawnTimer = 0;
  pendingSpawns = 0;
  bossSpawnedThisWave = false;

  crosshairX = 400;
  crosshairY = 270;

  score = 0;
  combo = 0;
  shotsFired = 0;
  hitsLanded = 0;

  paused = false;

  killTimes: number[] = [];
  totalWavesCleared = 0;
  lastWaveWasPerfect = false;

  upgradeStacks: UpgradeStacks = emptyUpgradeStacks();
  upgradeChoices: UpgradeId[] = [];
  upgradeFlashSec = 0;
  pendingEndingAfterBreak = false;

  tookPlayerDamageThisWave = false;
  /** 残り無敵時間（秒） */
  playerIframesSec = 0;

  private defeatFxQueue: Monster[] = [];
  private needBoss = false;
  private lastFireAtMs = -1e9;
  private lastStageBgIndex: number | null = null;
  private bossRushBossId: number | null = null;
  private bossRushDifficulty: BossRushDifficulty | null = null;

  pullDefeatFxMonsters(): Monster[] {
    const out = this.defeatFxQueue;
    this.defeatFxQueue = [];
    return out;
  }

  constructor(
    mode: GameMode,
    startStage: number,
    bossRush?: { bossId: number; difficulty: BossRushDifficulty },
  ) {
    this.mode = mode;
    const bg0 = pickStageBackground(null);
    this.lastStageBgIndex = bg0.index;
    this.stageBackgroundUrl = bg0.url;
    if (mode === "boss_rush") {
      if (!bossRush) throw new Error("boss_rush requires bossRush options");
      this.bossRushBossId = bossRush.bossId;
      this.bossRushDifficulty = bossRush.difficulty;
      this.stage = bossRush.bossId;
      this.waveInStage = 1;
      this.waveGlobal = 1;
      this.playerHp = BOSS_RUSH_PLAYER_HP;
      this.maxHp = BOSS_RUSH_PLAYER_HP;
      this.beginAnnounceBossRush();
    } else {
      this.stage = mode === "story" ? startStage : 1;
      this.beginAnnounce();
    }
  }

  /**
   * 敵の強さ・数・スポーン等に使うウェーブ指標。
   * - エンドレス: `waveGlobal`（通算）
   * - ストーリー: `waveInStage + (stage-1)×STORY_STAGE_DIFFICULTY_OFFSET`
   */
  private difficultyW(): number {
    if (this.mode === "boss_rush") return 24;
    if (this.mode === "endless") return this.waveGlobal;
    return this.waveInStage + (this.stage - 1) * STORY_STAGE_DIFFICULTY_OFFSET;
  }

  private beginAnnounceBossRush(): void {
    const d = this.bossRushDifficulty!;
    const label = { easy: "EASY", normal: "NORMAL", hard: "HARD", expert: "EXPERT" }[d];
    this.announceLabel = `BOSS RUSH — BOSS ${this.bossRushBossId} · ${label}`;
    this.phase = "announce";
    this.phaseTimer = ANNOUNCE_SEC;
    this.tookPlayerDamageThisWave = false;
    this.needBoss = false;
    this.bossSpawnedThisWave = true;
  }

  private pickSpawnLane(): number {
    const counts = [0, 0, 0, 0];
    for (const m of this.monsters) counts[m.lane] += 1;
    let min = counts[0];
    const candidates: number[] = [];
    for (let i = 0; i < 4; i++) {
      if (counts[i] < min) {
        min = counts[i];
        candidates.length = 0;
        candidates.push(i);
      } else if (counts[i] === min) {
        candidates.push(i);
      }
    }
    return candidates[Math.floor(Math.random() * candidates.length)]!;
  }

  snapshot(_playWidth: number, _playHeight: number): GameSnapshot {
    return {
      phase: this.phase,
      phaseTimer: this.phaseTimer,
      announceLabel: this.announceLabel,
      playerHp: this.playerHp,
      maxHp: this.maxHp,
      waveInStage: this.waveInStage,
      waveGlobal: this.waveGlobal,
      stage: this.stage,
      mode: this.mode,
      bossRushBossId: this.bossRushBossId ?? undefined,
      bossRushDifficulty: this.bossRushDifficulty ?? undefined,
      monsters: this.monsters.map((m) => ({ ...m })),
      bullets: this.bullets.map((b) => ({ ...b })),
      enemyBullets: this.enemyBullets.map((b) => ({ ...b })),
      crosshairX: this.crosshairX,
      crosshairY: this.crosshairY,
      score: this.score,
      combo: this.combo,
      shotsFired: this.shotsFired,
      hitsLanded: this.hitsLanded,
      paused: this.paused,
      reachedWave: this.waveGlobal,
      killTimes: [...this.killTimes],
      pendingSpawns: this.pendingSpawns,
      totalWavesCleared: this.totalWavesCleared,
      lastWaveWasPerfect: this.lastWaveWasPerfect,
      upgradeChoices: [...this.upgradeChoices],
      upgradeStacks: { ...this.upgradeStacks },
      upgradeFlashSec: this.upgradeFlashSec,
      pendingEndingAfterBreak: this.pendingEndingAfterBreak,
      stageBackgroundUrl: this.stageBackgroundUrl,
      playerIframesSec: this.playerIframesSec,
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
    if (this.mode === "story") {
      this.needBoss = this.waveInStage > 0 && this.waveInStage % 5 === 0;
    } else {
      this.needBoss = this.waveGlobal > 0 && this.waveGlobal % 5 === 0;
    }
    this.bossSpawnedThisWave = false;
    if (this.mode === "story") {
      this.announceLabel = `WAVE ${this.waveInStage} / 10 — STAGE ${this.stage}`;
    } else {
      this.announceLabel = `WAVE ${this.waveGlobal}`;
    }
    this.phase = "announce";
    this.phaseTimer = ANNOUNCE_SEC;
    this.tookPlayerDamageThisWave = false;
  }

  private startPlaying(): void {
    const playWidth = PLAYFIELD_WIDTH;
    const playHeight = PLAYFIELD_HEIGHT;
    this.phase = "playing";
    this.paused = false;
    this.bullets = [];
    this.enemyBullets = [];
    this.crosshairX = PLAYER_MARGIN_X + 42;
    this.crosshairY = laneCenterYpx(1, playHeight);
    this.tookPlayerDamageThisWave = false;
    this.playerIframesSec = 0;

    if (this.mode === "boss_rush") {
      this.pendingSpawns = 0;
      this.spawnTimer = 0;
      const m = spawnBossRushMonster(
        playWidth,
        this.bossRushBossId!,
        this.bossRushDifficulty!,
      );
      this.monsters = [m];
      return;
    }

    const W = this.difficultyW();
    this.pendingSpawns = monstersInWave(W);
    this.spawnTimer = 0;
    this.monsters = [];
    this.spawnNext();
  }

  private spawnNext(): void {
    if (this.pendingSpawns <= 0) return;
    const W = this.difficultyW();
    if (this.monsters.length >= maxConcurrent(W)) return;

    const isBoss = this.needBoss && !this.bossSpawnedThisWave;
    const lane = this.pickSpawnLane();
    const bossTen = isBoss
      ? this.mode === "story"
        ? this.waveInStage % 10 === 0
        : this.waveGlobal % 10 === 0
      : false;
    const m = spawnMonster(PLAYFIELD_WIDTH, W, isBoss, lane, bossTen);
    this.monsters.push(m);
    this.pendingSpawns -= 1;
    if (isBoss) this.bossSpawnedThisWave = true;
    this.spawnTimer = spawnIntervalSec(W);
  }

  /** 撃破直後・左外デスポーン直後など、フィールドが空いたら間隔を待たず埋める */
  private refillFieldIfEmpty(): void {
    if (this.phase !== "playing") return;
    const maxC = maxConcurrent(this.difficultyW());
    if (this.pendingSpawns <= 0 || this.monsters.length > 0) return;
    while (this.pendingSpawns > 0 && this.monsters.length < maxC) {
      this.spawnNext();
    }
  }

  tryFire(nowMs: number): boolean {
    if (this.phase !== "playing" || this.paused) return false;
    const cd = fireCooldownSec(this.upgradeStacks) * 1000;
    if (nowMs - this.lastFireAtMs < cd) return false;
    this.lastFireAtMs = nowMs;
    const volley = spawnPlayerVolley(this.crosshairX, this.crosshairY, this.upgradeStacks);
    this.bullets.push(...volley);
    this.shotsFired += volley.length;
    return true;
  }

  confirmUpgrade(id: UpgradeId): void {
    if (this.phase !== "upgrade_select") return;
    this.upgradeStacks = applyUpgradePick(this.upgradeStacks, id);
    if (id === "fortress_shield") {
      this.playerHp = Math.min(this.maxHp, this.playerHp + 1);
    }
    this.upgradeFlashSec = UPGRADE_FLASH_SEC;
    this.phase = "interwave";
    this.phaseTimer = INTERWAVE_SEC;
  }

  moveCrosshair(deltaX: number, deltaY: number): void {
    if (this.phase !== "playing" || this.paused) return;
    const mul = 1 + 0.2 * Math.min(5, this.upgradeStacks.speed_aim ?? 0);
    const playWidth = PLAYFIELD_WIDTH;
    const playHeight = PLAYFIELD_HEIGHT;
    const minX = PLAYER_MARGIN_X;
    const maxX = playWidth - PLAYER_MARGIN_X;
    const minY = PLAYER_MARGIN_Y;
    const maxY = playHeight - PLAYER_MARGIN_Y;
    this.crosshairX = Math.max(minX, Math.min(maxX, this.crosshairX + deltaX * mul));
    this.crosshairY = Math.max(minY, Math.min(maxY, this.crosshairY + deltaY * mul));
  }

  private applyKill(m: Monster, now: number, playHeight: number): void {
    const boost = scoreBoostMultiplier(this.upgradeStacks);
    this.score += killScore(m.maxHp, this.combo, m.isBoss, m.isElite, m.isRare, boost);
    this.combo += 1;
    this.killTimes.push(now);
    this.killTimes = this.killTimes.filter((t) => now - t <= 3000);

    const cx = m.x;
    const cy = monsterWorldY(m, playHeight);
    const n = burstBulletCount(this.upgradeStacks);
    if ((this.upgradeStacks.pierce_burst ?? 0) > 0 && n > 0) {
      this.bullets.push(
        ...spawnBurstRing(cx, cy, n, bulletSpeedMultiplier(this.upgradeStacks)),
      );
    }

    this.defeatFxQueue.push({ ...m });
    this.monsters = this.monsters.filter((x) => x.id !== m.id);
  }

  private damageMonsterById(id: string, now: number, playHeight: number): void {
    const m = this.monsters.find((x) => x.id === id);
    if (!m) return;
    if (m.hp <= 1) {
      this.applyKill(m, now, playHeight);
    } else {
      this.monsters = this.monsters.map((x) => (x.id === id ? { ...x, hp: x.hp - 1 } : x));
    }
  }

  private processPlayerBullets(dt: number, now: number, playWidth: number, playHeight: number): void {
    const next: Bullet[] = [];
    for (const b0 of this.bullets) {
      let b = stepBulletHoming(b0, dt, this.monsters, playHeight);
      b = advanceBullet(b, dt);
      if (bulletOutOfField(b, playWidth, playHeight)) continue;

      let cur = b;
      let absorbed = false;
      const struck = new Set<string>();
      while (!absorbed) {
        const hit = tryBulletHits(cur, this.monsters, playHeight, struck);
        if (!hit) {
          next.push(cur);
          break;
        }
        this.hitsLanded += 1;
        struck.add(hit.monsterId);
        this.damageMonsterById(hit.monsterId, now, playHeight);
        if (hit.newBullet) {
          cur = hit.newBullet;
        } else {
          absorbed = true;
        }
      }
    }
    this.bullets = next;
  }

  private processEnemyBullets(dt: number, playWidth: number, playHeight: number): void {
    const queue: EnemyBullet[] = [...this.enemyBullets];
    const survived: EnemyBullet[] = [];
    let qi = 0;
    while (qi < queue.length) {
      const raw = queue[qi++];
      let eb = advanceEnemyBullet(raw, dt);
      if (enemyBulletOutOfField(eb, playWidth, playHeight)) continue;
      if (eb.variant === "boss_burger") {
        const burstIv = BOSS_BURGER_EIGHT_WAY_INTERVAL_SEC;
        let bt = (eb.burstTimer ?? burstIv) - dt;
        const childSpd = BOSS_BURGER_CHILD_BULLET_SPEED;
        while (bt <= 0) {
          queue.push(...spawnEightWayEnemyBurst(eb.x, eb.y, childSpd));
          bt += burstIv;
        }
        eb = { ...eb, burstTimer: bt };
      }
      if (enemyBulletHitsPlayer(eb, this.crosshairX, this.crosshairY)) {
        if (this.playerIframesSec > 0) {
          continue;
        }
        this.playerHp -= 1;
        this.tookPlayerDamageThisWave = true;
        this.combo = 0; // 被弾（ダメージ）でコンボリセット
        this.playerIframesSec = PLAYER_IFRAMES_AFTER_HIT;
        if (this.playerHp <= 0) {
          this.bullets = [];
          this.enemyBullets = [];
          this.playerIframesSec = 0;
          this.announceLabel = "GAME OVER";
          this.phase = "game_over_banner";
          this.phaseTimer = GAME_OVER_BANNER_SEC;
          return;
        }
        continue;
      }
      survived.push(eb);
    }
    this.enemyBullets = survived;
  }

  private stepMonsters(dt: number, playWidth: number, playHeight: number): void {
    const px = this.crosshairX;
    const py = this.crosshairY;
    const bSpeed = enemyBulletSpeed(this.difficultyW());
    const updated: Monster[] = [];
    const BOSS_RISE_SPEED = 95;
    const BOSS_MARGIN = 80;
    const bossPatrolLo = BOSS_MARGIN;
    const bossPatrolHi = playHeight - BOSS_MARGIN;

    for (const m of this.monsters) {
      let timer = m.enemyFireTimer - dt;
      if (timer <= 0) {
        const aimSpd =
          m.isBoss && m.skinIndex === 1 ? bSpeed * BOSS1_AIMED_BULLET_MULT : bSpeed;
        this.enemyBullets.push(
          spawnEnemyBulletTowardPlayer(m, playHeight, px, py, aimSpd),
        );
        timer = m.enemyFireInterval + Math.random() * 0.35;
      }

      if (m.isBoss) {
        const anchorX = playWidth * 0.82;
        const enterY = playHeight * 0.38;
        let phase = m.bossPhase ?? "rising";
        let y = m.bossY ?? playHeight + 100;
        let vy = m.bossVy ?? 90;
        let burgerCd = m.boss1BurgerCd;

        if (m.skinIndex === 1) {
          const ratio = m.maxHp > 0 ? m.hp / m.maxHp : 0.3;
          const spawnIv = boss1BurgerSpawnIntervalSec(ratio);
          burgerCd = (burgerCd ?? spawnIv * 0.4) - dt;
          const slow = bSpeed * BOSS1_BURGER_SPEED_MULT;
          while (burgerCd <= 0) {
            this.enemyBullets.push(
              spawnBossBurgerBullet(
                anchorX,
                y,
                px,
                py,
                slow,
                BOSS_BURGER_EIGHT_WAY_INTERVAL_SEC,
              ),
            );
            burgerCd += spawnIv;
          }
        }

        if (phase === "rising") {
          y -= BOSS_RISE_SPEED * dt;
          if (y <= enterY) {
            y = enterY;
            phase = "patrol";
            vy = Math.abs(vy) > 0 ? Math.abs(vy) : 90;
          }
        } else {
          y += vy * dt;
          if (y < bossPatrolLo) {
            y = bossPatrolLo;
            vy = Math.abs(vy);
          } else if (y > bossPatrolHi) {
            y = bossPatrolHi;
            vy = -Math.abs(vy);
          }
        }

        const baseBoss = {
          ...m,
          x: anchorX,
          speed: 0,
          bossY: y,
          bossVy: vy,
          bossPhase: phase,
          enemyFireTimer: timer,
        };
        updated.push(
          m.skinIndex === 1 ? { ...baseBoss, boss1BurgerCd: burgerCd } : baseBoss,
        );
        continue;
      }

      const nx = m.x - m.speed * dt;
      // 左画面外へ出た敵は撃破扱いにならず消滅（ボスは除外）
      if (nx < MONSTER_DESPAWN_X) continue;
      updated.push({ ...m, x: nx, enemyFireTimer: timer });
    }
    this.monsters = updated;
  }

  private onWaveCleared(): void {
    if (this.mode === "boss_rush") {
      this.bullets = [];
      this.enemyBullets = [];
      const bg = pickStageBackground(this.lastStageBgIndex);
      this.lastStageBgIndex = bg.index;
      this.stageBackgroundUrl = bg.url;
      this.announceLabel = "BOSS 撃破！";
      this.phase = "wave_clear";
      this.phaseTimer = WAVE_CLEAR_SEC;
      return;
    }

    this.totalWavesCleared += 1;
    this.lastWaveWasPerfect = !this.tookPlayerDamageThisWave;
    this.bullets = [];
    this.enemyBullets = [];

    const bg = pickStageBackground(this.lastStageBgIndex);
    this.lastStageBgIndex = bg.index;
    this.stageBackgroundUrl = bg.url;

    if (this.mode === "story" && this.waveInStage === 10) {
      // 各ステージはウェーブ10クリアで完走（次ステージへは進まず結果へ）
      this.pendingEndingAfterBreak = true;
    } else {
      this.waveInStage += 1;
    }

    this.upgradeChoices = pickUpgradeChoices(this.upgradeStacks);
    this.announceLabel = "WAVE クリア";
    this.phase = "wave_clear";
    this.phaseTimer = WAVE_CLEAR_SEC;
  }

  step(dt: number, now: number, playWidth: number, playHeight: number): void {
    void playWidth;
    void playHeight;
    const pw = PLAYFIELD_WIDTH;
    const ph = PLAYFIELD_HEIGHT;

    if (this.phase === "gameover" || this.phase === "ending") return;

    if (this.upgradeFlashSec > 0) {
      this.upgradeFlashSec = Math.max(0, this.upgradeFlashSec - dt);
    }

    if (this.phase === "announce") {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) this.startPlaying();
      return;
    }

    if (this.phase === "wave_clear") {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) {
        if (this.mode === "boss_rush") {
          this.phase = "ending";
        } else {
          this.phase = "upgrade_select";
          this.phaseTimer = 0;
        }
      }
      return;
    }

    if (this.phase === "upgrade_select") {
      return;
    }

    if (this.phase === "interwave") {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) {
        if (this.pendingEndingAfterBreak) {
          this.phase = "ending";
          return;
        }
        this.beginAnnounce();
      }
      return;
    }

    if (this.phase === "paused") return;

    if (this.phase === "game_over_banner") {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) {
        this.phase = "gameover";
      }
      return;
    }

    if (this.phase !== "playing") return;

    if (this.playerIframesSec > 0) {
      this.playerIframesSec = Math.max(0, this.playerIframesSec - dt);
    }

    this.processPlayerBullets(dt, now, pw, ph);
    if (this.phase !== "playing") return;

    this.refillFieldIfEmpty();

    this.stepMonsters(dt, pw, ph);

    this.refillFieldIfEmpty();

    this.processEnemyBullets(dt, pw, ph);
    if (this.phase !== "playing") return;

    const maxC = maxConcurrent(this.difficultyW());
    this.spawnTimer -= dt;
    while (
      this.pendingSpawns > 0 &&
      this.spawnTimer <= 0 &&
      this.monsters.length < maxC
    ) {
      this.spawnNext();
    }

    if (this.pendingSpawns <= 0 && this.monsters.length === 0) {
      this.onWaveCleared();
    }
  }
}

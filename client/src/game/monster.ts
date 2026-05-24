import { laneCenterYpx } from "./lanes.ts";
import { PLAYFIELD_HEIGHT } from "./playfield.ts";

export type BossPhase = "rising" | "patrol";

export type Monster = {
  id: string;
  x: number;
  lane: number;
  hp: number;
  maxHp: number;
  isBoss: boolean;
  isElite: boolean;
  speed: number;
  /** 次の敵弾までの残り秒 */
  enemyFireTimer: number;
  /** 敵弾の発射間隔（通常 ＜ 精鋭 ＜ ボス） */
  enemyFireInterval: number;
  /**
   * Normal: 1..6 → `/assets/enemies/{n}.png`
   * Boss: 1..BOSS_SKIN_COUNT → `/assets/enemies/boss{n}.png`（専用ボス画像）
   */
  skinIndex: number;
  isRare: boolean;
  /** ボス専用: 画面座標 Y（px）・右側固定で上下往復 */
  bossY?: number;
  bossVy?: number;
  bossPhase?: BossPhase;
  /** boss1: 大型弾の追加発射クールダウン（秒） */
  boss1BurgerCd?: number;
};

export type BossRushDifficulty = "easy" | "normal" | "hard" | "expert";

export const ENEMY_SKIN_COUNT = 6;
/** ボス用スプライト（提供画像 boss1〜boss4） */
export const BOSS_SKIN_COUNT = 4;
export const RARE_SPAWN_CHANCE = 0.12;

let _id = 0;
export function nextMonsterId(): string {
  _id += 1;
  return `m-${_id}`;
}

function pickNormalSkin(): number {
  return 1 + Math.floor(Math.random() * ENEMY_SKIN_COUNT);
}

function pickBossSkin(): number {
  return 1 + Math.floor(Math.random() * BOSS_SKIN_COUNT);
}

/** 当たり判定・描画の基準 Y（ボスは bossY、それ以外はレーン） */
export function monsterWorldY(m: Monster, playHeight: number): number {
  if (m.isBoss && m.bossY !== undefined) return m.bossY;
  if (m.isBoss) return playHeight + 100;
  return laneCenterYpx(m.lane, playHeight);
}

export function normalMonsterHp(waveGlobal: number): number {
  const raw = 1 + Math.floor(waveGlobal / 8);
  return Math.min(5, Math.max(2, raw));
}

/** レア敵 HP: 通常より大幅に多く、ウェーブが進むほど倍率も伸びる */
export function rareMonsterHp(normalHp: number, waveGlobal: number): number {
  const scaling = 2.75 + Math.min(4.2, waveGlobal * 0.13);
  return Math.min(36, Math.max(5, Math.ceil(normalHp * scaling)));
}

export function eliteMonsterHp(normalHp: number): number {
  return Math.max(3, normalHp * 3);
}

export function bossMonsterHp(
  waveGlobal: number,
  tenWaveBonus: boolean,
): number {
  let hp = Math.min(58, 16 + Math.floor(waveGlobal * 2.35));
  if (tenWaveBonus) {
    hp = Math.min(92, Math.floor(hp * 1.55) + 18);
  }
  return Math.max(hp, 22);
}

function eliteSpawnRate(waveGlobal: number): number {
  return Math.min(0.25, 0.05 + waveGlobal * 0.005);
}

/** 発射間隔（秒）。短いほど連射が速い。通常 > 精鋭 > ボス（ボスが最速）。 */
export function enemyFireIntervalSec(
  isBoss: boolean,
  isElite: boolean,
  waveGlobal: number,
): number {
  const w = Math.max(0.5, 1 - waveGlobal * 0.012);
  if (isBoss) return Math.max(0.32, 0.5 * w);
  if (isElite) return Math.max(0.55, 1.05 * w);
  return Math.max(0.95, 2.15 * w);
}

export function spawnMonster(
  playWidth: number,
  waveGlobal: number,
  isBoss: boolean,
  lane: number,
  bossIsTenWave = false,
): Monster {
  let speed = Math.min(200, 40 + waveGlobal * 3);
  let isElite = false;
  let isRare = false;
  let maxHp: number;
  let skinIndex: number;

  if (isBoss) {
    maxHp = bossMonsterHp(waveGlobal, bossIsTenWave);
    skinIndex = pickBossSkin();
  } else {
    skinIndex = pickNormalSkin();
    const nhp = normalMonsterHp(waveGlobal);
    if (Math.random() < RARE_SPAWN_CHANCE) {
      isRare = true;
      maxHp = rareMonsterHp(nhp, waveGlobal);
      const rareSpdMul = 1.12 + Math.min(0.18, waveGlobal * 0.0055);
      speed = Math.min(200, speed * rareSpdMul);
    } else if (Math.random() < eliteSpawnRate(waveGlobal)) {
      isElite = true;
      maxHp = eliteMonsterHp(nhp);
    } else {
      maxHp = nhp;
    }
  }

  const enemyFireInterval = enemyFireIntervalSec(isBoss, isElite, waveGlobal);
  const enemyFireTimer = 0.4 + Math.random() * 1.1;

  if (isBoss) {
    const anchorX = playWidth * 0.82;
    const base = {
      id: nextMonsterId(),
      x: anchorX,
      lane,
      hp: maxHp,
      maxHp,
      isBoss: true as const,
      isElite: false,
      speed: 0,
      skinIndex,
      isRare: false,
      enemyFireTimer,
      enemyFireInterval,
      bossY: PLAYFIELD_HEIGHT + 100,
      bossVy: 78,
      bossPhase: "rising" as const,
    };
    return skinIndex === 1 ? { ...base, boss1BurgerCd: 0.85 } : base;
  }

  return {
    id: nextMonsterId(),
    x: playWidth - 24 - Math.random() * 48,
    lane,
    hp: maxHp,
    maxHp,
    isBoss,
    isElite,
    speed,
    skinIndex,
    isRare,
    enemyFireTimer,
    enemyFireInterval,
  };
}

const BOSS_RUSH_HP_MULT: Record<BossRushDifficulty, number> = {
  easy: 0.52,
  normal: 1,
  hard: 1.72,
  expert: 2.48,
};

/** BOSS RUSH 専用: 指定ボス1体のみ（右固定・登場パターンは通常ボスと同じ） */
export function spawnBossRushMonster(
  playWidth: number,
  bossId: number,
  difficulty: BossRushDifficulty,
): Monster {
  const clampedId = Math.max(1, Math.min(BOSS_SKIN_COUNT, bossId));
  const baseHp = 50;
  const maxHp = Math.max(14, Math.round(baseHp * BOSS_RUSH_HP_MULT[difficulty]));
  const W = 22;
  const enemyFireInterval = enemyFireIntervalSec(true, false, W);
  const anchorX = playWidth * 0.82;
  return {
    id: nextMonsterId(),
    x: anchorX,
    lane: 1,
    hp: maxHp,
    maxHp,
    isBoss: true,
    isElite: false,
    speed: 0,
    skinIndex: clampedId,
    isRare: false,
    enemyFireTimer: 0.35 + Math.random() * 0.4,
    enemyFireInterval,
    bossY: PLAYFIELD_HEIGHT + 100,
    bossVy: 88,
    bossPhase: "rising",
    ...(clampedId === 1 ? { boss1BurgerCd: 0.9 } : {}),
  };
}

export function monsterImagePath(m: Monster): string {
  if (m.isRare) return "/assets/enemies/rare.png";
  if (m.isBoss) return `/assets/enemies/boss${m.skinIndex}.png`;
  return `/assets/enemies/${m.skinIndex}.png`;
}

export function monsterDisplayScale(m: Monster): number {
  if (m.isBoss) return 1.78;
  if (m.isElite) return 1.32;
  return 1;
}

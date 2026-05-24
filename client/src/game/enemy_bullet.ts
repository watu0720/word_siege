import type { Monster } from "./monster.ts";
import { monsterWorldY } from "./monster.ts";
import {
  BOSS_BURGER_BULLET_HIT_RADIUS,
  ENEMY_BULLET_HIT_RADIUS,
  PLAYER_HIT_RADIUS,
  PLAYFIELD_HEIGHT,
} from "./playfield.ts";

export type EnemyBulletVariant = "normal" | "boss_burger";

export type EnemyBullet = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  variant?: EnemyBulletVariant;
  /** boss_burger: 八方向弾を出すまでの残り秒 */
  burstTimer?: number;
};

let _eb = 0;
export function nextEnemyBulletId(): string {
  _eb += 1;
  return `eb-${_eb}`;
}

/** HP割合が低いほど間隔が短くなる（1=満タン）— ボスが特殊弾を撃つ頻度のみ */
export function boss1BurgerSpawnIntervalSec(hpRatio: number): number {
  const r = Math.max(0.06, Math.min(1, hpRatio));
  return Math.max(0.42, 0.48 + r * 1.85);
}

/** 特殊弾が八方向に通常弾を出す間隔（HP 非依存・固定） */
export const BOSS_BURGER_EIGHT_WAY_INTERVAL_SEC = 1.15;

/** 特殊弾が八方向に飛ばす子弾の速さ（難易度・W 非依存の固定値） */
export const BOSS_BURGER_CHILD_BULLET_SPEED = 210;

export function spawnEnemyBulletTowardPlayer(
  m: Monster,
  playHeight: number,
  playerX: number,
  playerY: number,
  speed: number,
): EnemyBullet {
  const mx = m.x;
  const my = monsterWorldY(m, playHeight);
  const dx = playerX - mx;
  const dy = playerY - my;
  const len = Math.hypot(dx, dy) || 1;
  return {
    id: nextEnemyBulletId(),
    x: mx,
    y: my,
    vx: (dx / len) * speed,
    vy: (dy / len) * speed,
    variant: "normal",
  };
}

/** boss1 用: 自機方向へ遅めに進む大型弾（八方向連射は process で処理） */
export function spawnBossBurgerBullet(
  mx: number,
  my: number,
  playerX: number,
  playerY: number,
  speed: number,
  initialBurstDelay: number,
): EnemyBullet {
  const dx = playerX - mx;
  const dy = playerY - my;
  const len = Math.hypot(dx, dy) || 1;
  return {
    id: nextEnemyBulletId(),
    x: mx,
    y: my,
    vx: (dx / len) * speed,
    vy: (dy / len) * speed,
    variant: "boss_burger",
    burstTimer: initialBurstDelay,
  };
}

/** 8 方向（45°刻み）に通常敵弾 */
export function spawnEightWayEnemyBurst(x: number, y: number, speed: number): EnemyBullet[] {
  const out: EnemyBullet[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 4) * i;
    out.push({
      id: nextEnemyBulletId(),
      x,
      y,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed,
      variant: "normal",
    });
  }
  return out;
}

export function advanceEnemyBullet(b: EnemyBullet, dt: number): EnemyBullet {
  return { ...b, x: b.x + b.vx * dt, y: b.y + b.vy * dt };
}

export function enemyBulletOutOfField(
  b: EnemyBullet,
  playWidth: number,
  playHeight: number = PLAYFIELD_HEIGHT,
): boolean {
  return b.x < -40 || b.x > playWidth + 40 || b.y < -40 || b.y > playHeight + 40;
}

export function enemyBulletHitsPlayer(b: EnemyBullet, playerX: number, playerY: number): boolean {
  const dx = b.x - playerX;
  const dy = b.y - playerY;
  const br =
    b.variant === "boss_burger" ? BOSS_BURGER_BULLET_HIT_RADIUS : ENEMY_BULLET_HIT_RADIUS;
  const r = PLAYER_HIT_RADIUS + br;
  return dx * dx + dy * dy <= r * r;
}

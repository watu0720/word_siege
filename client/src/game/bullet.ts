import type { Monster } from "./monster.ts";
import { monsterWorldY } from "./monster.ts";
import type { UpgradeStacks } from "./upgrades.ts";
import {
  bulletSpeedMultiplier,
  magnetStrength,
  pierceExtraTargets,
} from "./upgrades.ts";

export type Bullet = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  pierceRemaining: number;
  burstChild: boolean;
  homing: number;
  speedMul: number;
  /** この弾が既に 1 回ダメージを与えた敵（フレームをまたいでも同一敵に複数回入れない） */
  hitMonsterIds: string[];
};

let _bid = 0;
export function nextBulletId(): string {
  _bid += 1;
  return `b-${_bid}`;
}

const MONSTER_HALF_W = 26;
const MONSTER_HALF_H = 30;

export function monsterHitbox(
  m: Monster,
  playHeight: number,
): { cx: number; cy: number; hw: number; hh: number } {
  const scale = m.isBoss ? 1.78 : m.isElite ? 1.38 : 1;
  return {
    cx: m.x,
    cy: monsterWorldY(m, playHeight),
    hw: MONSTER_HALF_W * scale,
    hh: MONSTER_HALF_H * scale,
  };
}

function inHitbox(
  bx: number,
  by: number,
  cx: number,
  cy: number,
  hw: number,
  hh: number,
): boolean {
  return Math.abs(bx - cx) <= hw && Math.abs(by - cy) <= hh;
}

function nearestMonster(
  bx: number,
  by: number,
  monsters: Monster[],
  playHeight: number,
  excludeIds: Set<string>,
): Monster | null {
  let best: Monster | null = null;
  let bestD = 1e9;
  for (const m of monsters) {
    if (excludeIds.has(m.id)) continue;
    const { cx, cy } = monsterHitbox(m, playHeight);
    const d = (bx - cx) ** 2 + (by - cy) ** 2;
    if (d < bestD) {
      bestD = d;
      best = m;
    }
  }
  return best;
}

export function stepBulletHoming(
  b: Bullet,
  dt: number,
  monsters: Monster[],
  playHeight: number,
): Bullet {
  if (b.homing <= 0 || b.burstChild || monsters.length === 0) return b;
  const target = nearestMonster(b.x, b.y, monsters, playHeight, new Set());
  if (!target) return b;
  const { cx, cy } = monsterHitbox(target, playHeight);
  const dx = cx - b.x;
  const dy = cy - b.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = dx / len;
  const ny = dy / len;
  const turn = b.homing * 4.5 * dt;
  let vx = b.vx + nx * turn * 420;
  let vy = b.vy + ny * turn * 420;
  const sp = Math.hypot(vx, vy) || 1;
  const base = 520 * b.speedMul;
  const scale = base / sp;
  vx *= scale;
  vy *= scale;
  return { ...b, vx, vy };
}

export function advanceBullet(b: Bullet, dt: number): Bullet {
  return { ...b, x: b.x + b.vx * dt, y: b.y + b.vy * dt };
}

export function tryBulletHits(
  b: Bullet,
  monsters: Monster[],
  playHeight: number,
  excludeIds: Set<string>,
): { monsterId: string; newBullet: Bullet | null } | null {
  for (const m of monsters) {
    if (excludeIds.has(m.id)) continue;
    if (b.hitMonsterIds.includes(m.id)) continue;
    const box = monsterHitbox(m, playHeight);
    if (inHitbox(b.x, b.y, box.cx, box.cy, box.hw, box.hh)) {
      if (b.burstChild || b.pierceRemaining <= 0) {
        return { monsterId: m.id, newBullet: null };
      }
      return {
        monsterId: m.id,
        newBullet: {
          ...b,
          pierceRemaining: b.pierceRemaining - 1,
          hitMonsterIds: [...b.hitMonsterIds, m.id],
        },
      };
    }
  }
  return null;
}

export function bulletOutOfField(b: Bullet, playWidth: number, playHeight: number): boolean {
  return b.x > playWidth + 40 || b.x < -40 || b.y < -40 || b.y > playHeight + 40;
}

export function spawnPlayerVolley(cx: number, cy: number, stacks: UpgradeStacks): Bullet[] {
  const speedMul = bulletSpeedMultiplier(stacks);
  const baseV = 520 * speedMul;
  const pierceR = pierceExtraTargets(stacks);
  const homing = magnetStrength(stacks);
  const triple = (stacks.triple_shot ?? 0) > 0;
  const double = (stacks.double_shot ?? 0) > 0;

  const mk = (vx: number, vy: number, yoff = 0): Bullet => ({
    id: nextBulletId(),
    x: cx,
    y: cy + yoff,
    vx,
    vy,
    pierceRemaining: pierceR,
    burstChild: false,
    homing,
    speedMul,
    hitMonsterIds: [],
  });

  if (triple) {
    const angles = [-0.26, 0, 0.26];
    return angles.map((a) => mk(Math.cos(a) * baseV, Math.sin(a) * baseV));
  }
  if (double) {
    return [mk(baseV, 0, -7), mk(baseV, 0, 7)];
  }
  return [mk(baseV, 0)];
}

export function spawnBurstRing(cx: number, cy: number, count: number, speedMul: number): Bullet[] {
  const base = 380 * speedMul;
  const out: Bullet[] = [];
  for (let i = 0; i < count; i++) {
    const a = (Math.PI * 2 * i) / count;
    out.push({
      id: nextBulletId(),
      x: cx,
      y: cy,
      vx: Math.cos(a) * base,
      vy: Math.sin(a) * base,
      pierceRemaining: 0,
      burstChild: true,
      homing: 0,
      speedMul,
      hitMonsterIds: [],
    });
  }
  return out;
}

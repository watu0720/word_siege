export type Monster = {
  id: string;
  word: string;
  /** Distance from left edge of playfield (px). */
  x: number;
  /** Vertical lane 0 (top) .. 3 (bottom). */
  lane: number;
  hp: number;
  maxHp: number;
  isBoss: boolean;
  speed: number;
  /** 1..6 maps to /assets/enemies/{n}.png; ignored when isRare. */
  skinIndex: number;
  isRare: boolean;
};

export const ENEMY_SKIN_COUNT = 6;
/** Chance for non-boss to spawn as rare (uses rare.png + score bonus). */
export const RARE_SPAWN_CHANCE = 0.12;

let _id = 0;
export function nextMonsterId(): string {
  _id += 1;
  return `m-${_id}`;
}

function pickSkinIndex(): number {
  return 1 + Math.floor(Math.random() * ENEMY_SKIN_COUNT);
}

export function spawnMonster(
  word: string,
  playWidth: number,
  waveGlobal: number,
  isBoss: boolean,
  lane: number,
): Monster {
  const speed = Math.min(200, 40 + waveGlobal * 3);
  const maxHp = isBoss ? 3 : 1;
  const isRare = !isBoss && Math.random() < RARE_SPAWN_CHANCE;
  return {
    id: nextMonsterId(),
    word,
    x: playWidth - 24,
    lane,
    hp: maxHp,
    maxHp,
    isBoss,
    speed,
    skinIndex: isBoss ? pickSkinIndex() : pickSkinIndex(),
    isRare,
  };
}

export function monsterImagePath(m: Monster): string {
  if (m.isRare) return "/assets/enemies/rare.png";
  return `/assets/enemies/${m.skinIndex}.png`;
}

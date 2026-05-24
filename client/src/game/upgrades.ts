/** Roguelike upgrade cards: definitions, caps, and random 3-pick (no duplicates per wave). */

export type UpgradeId =
  | "speed_aim"
  | "rapid_fire"
  | "double_shot"
  | "triple_shot"
  | "pierce"
  | "pierce_burst"
  | "fortress_shield"
  | "sniper"
  | "magnet"
  | "score_boost";

export type UpgradeCardDef = {
  id: UpgradeId;
  name: string;
  icon: string;
  description: string;
  maxStacks: number;
};

export const UPGRADE_DEFS: Record<UpgradeId, UpgradeCardDef> = {
  speed_aim: {
    id: "speed_aim",
    name: "スピードアップ",
    icon: "⚡",
    description: "照準の移動速度 +20%",
    maxStacks: 5,
  },
  rapid_fire: {
    id: "rapid_fire",
    name: "ラピッドファイア",
    icon: "🔥",
    description: "弾のクールダウン -0.04 秒（最小 0.10 秒）",
    maxStacks: 5,
  },
  double_shot: {
    id: "double_shot",
    name: "ダブルショット",
    icon: "✕2",
    description: "発射ごとに弾を 2 発同時（縦にわずかにずれて）",
    maxStacks: 1,
  },
  triple_shot: {
    id: "triple_shot",
    name: "トリプルショット",
    icon: "✕3",
    description: "発射ごとに弾を 3 発同時（扇状）",
    maxStacks: 1,
  },
  pierce: {
    id: "pierce",
    name: "貫通弾",
    icon: "➤",
    description: "弾が敵を貫通（最大 3 体まで）",
    maxStacks: 2,
  },
  pierce_burst: {
    id: "pierce_burst",
    name: "ピアスバースト",
    icon: "✦",
    description: "撃破時に周囲へ拡散弾（貫通なし）",
    maxStacks: 2,
  },
  fortress_shield: {
    id: "fortress_shield",
    name: "ライフ回復",
    icon: "🛡",
    description: "自機 HP を +1 回復（最大 HP を超えない）",
    maxStacks: 999,
  },
  sniper: {
    id: "sniper",
    name: "スナイパーモード",
    icon: "🎯",
    description: "弾の飛翔速度 +50%",
    maxStacks: 3,
  },
  magnet: {
    id: "magnet",
    name: "マグネット",
    icon: "🧲",
    description: "弾が最近傍の敵へ軽くホーミング",
    maxStacks: 2,
  },
  score_boost: {
    id: "score_boost",
    name: "スコアブースト",
    icon: "★",
    description: "キルスコア +20%",
    maxStacks: 5,
  },
};

export type UpgradeStacks = Record<UpgradeId, number>;

export function emptyUpgradeStacks(): UpgradeStacks {
  return {
    speed_aim: 0,
    rapid_fire: 0,
    double_shot: 0,
    triple_shot: 0,
    pierce: 0,
    pierce_burst: 0,
    fortress_shield: 0,
    sniper: 0,
    magnet: 0,
    score_boost: 0,
  };
}

function stackOf(stacks: UpgradeStacks, id: UpgradeId): number {
  return stacks[id] ?? 0;
}

export function availableUpgradeIds(stacks: UpgradeStacks): UpgradeId[] {
  const out: UpgradeId[] = [];
  for (const id of Object.keys(UPGRADE_DEFS) as UpgradeId[]) {
    const def = UPGRADE_DEFS[id];
    if (stackOf(stacks, id) >= def.maxStacks) continue;
    if (id === "double_shot" && stackOf(stacks, "triple_shot") > 0) continue;
    if (id === "triple_shot" && stackOf(stacks, "double_shot") === 0) continue;
    out.push(id);
  }
  return out;
}

export function pickUpgradeChoices(stacks: UpgradeStacks, rng: () => number = Math.random): UpgradeId[] {
  const pool = [...availableUpgradeIds(stacks)];
  const picks: UpgradeId[] = [];
  while (picks.length < 3 && pool.length > 0) {
    const i = Math.floor(rng() * pool.length);
    picks.push(pool[i]!);
    pool.splice(i, 1);
  }
  while (picks.length < 3) picks.push("fortress_shield");
  return picks;
}

export function applyUpgradePick(stacks: UpgradeStacks, id: UpgradeId): UpgradeStacks {
  const next = { ...stacks };
  const def = UPGRADE_DEFS[id];
  const cur = stackOf(next, id);
  if (cur < def.maxStacks) next[id] = cur + 1;
  if (id === "triple_shot" && next.triple_shot > 0) next.double_shot = 0;
  return next;
}

export function aimSpeedMultiplier(stacks: UpgradeStacks): number {
  return 1 + 0.2 * Math.min(5, stackOf(stacks, "speed_aim"));
}

export function fireCooldownSec(stacks: UpgradeStacks): number {
  return Math.max(0.1, 0.3 - 0.04 * Math.min(5, stackOf(stacks, "rapid_fire")));
}

export function pierceExtraTargets(stacks: UpgradeStacks): number {
  return Math.min(2, stackOf(stacks, "pierce"));
}

export function bulletSpeedMultiplier(stacks: UpgradeStacks): number {
  return 1 + 0.5 * Math.min(3, stackOf(stacks, "sniper"));
}

export function magnetStrength(stacks: UpgradeStacks): number {
  return 0.12 * Math.min(2, stackOf(stacks, "magnet"));
}

export function scoreBoostMultiplier(stacks: UpgradeStacks): number {
  return 1 + 0.2 * Math.min(5, stackOf(stacks, "score_boost"));
}

export function burstBulletCount(stacks: UpgradeStacks): number {
  return 8 + 2 * Math.min(2, stackOf(stacks, "pierce_burst"));
}

/** ポーズ画面など: スタック 1 以上の強化一覧 */
export function listActiveUpgrades(stacks: UpgradeStacks): { name: string; count: number }[] {
  const out: { name: string; count: number }[] = [];
  for (const id of Object.keys(UPGRADE_DEFS) as UpgradeId[]) {
    const c = stackOf(stacks, id);
    if (c > 0) out.push({ name: UPGRADE_DEFS[id].name, count: c });
  }
  return out;
}

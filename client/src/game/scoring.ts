export function killScore(
  maxHp: number,
  comboBefore: number,
  isBoss: boolean,
  isElite: boolean,
  isRare: boolean,
  scoreBoostMul: number,
): number {
  const base = 100 + maxHp * 30;
  let mult = 1 + Math.min(5, comboBefore) * 0.12;
  if (isBoss) mult *= 3;
  if (isElite) mult *= 2;
  if (isRare) mult *= 2.25;
  mult *= scoreBoostMul;
  return Math.floor(base * mult);
}

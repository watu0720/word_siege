export function killScore(
  wordLen: number,
  combo: number,
  isBoss: boolean,
  isRare: boolean,
): number {
  const base = 100 + wordLen * 20;
  let mult = 1 + Math.min(5, combo) * 0.12;
  if (isBoss) mult *= 3;
  if (isRare) mult *= 2.25;
  return Math.floor(base * mult);
}

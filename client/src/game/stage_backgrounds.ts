/** ステージ背景（`client/assets/backgrounds/01.png` … `12.png`） */
export const STAGE_BACKGROUND_URLS: readonly string[] = [
  "/assets/backgrounds/01.png",
  "/assets/backgrounds/02.png",
  "/assets/backgrounds/03.png",
  "/assets/backgrounds/04.png",
  "/assets/backgrounds/05.png",
  "/assets/backgrounds/06.png",
  "/assets/backgrounds/07.png",
  "/assets/backgrounds/08.png",
  "/assets/backgrounds/09.png",
  "/assets/backgrounds/10.png",
  "/assets/backgrounds/11.png",
  "/assets/backgrounds/12.png",
];

/**
 * 直前に使ったインデックス以外からランダムに 1 枚選ぶ（連続同じ画像を避ける）。
 */
export function pickStageBackground(excludeIndex: number | null): { index: number; url: string } {
  const n = STAGE_BACKGROUND_URLS.length;
  if (n === 0) return { index: 0, url: "" };
  if (n === 1) return { index: 0, url: STAGE_BACKGROUND_URLS[0]! };
  const candidates =
    excludeIndex === null
      ? [...STAGE_BACKGROUND_URLS.keys()]
      : [...STAGE_BACKGROUND_URLS.keys()].filter((i) => i !== excludeIndex);
  const idx = candidates[Math.floor(Math.random() * candidates.length)]!;
  return { index: idx, url: STAGE_BACKGROUND_URLS[idx]! };
}

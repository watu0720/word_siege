import { PLAYFIELD_HEIGHT } from "./playfield.ts";

/** Lane band center as fraction of playfield height (matches UI `laneTopPct`). */
export function laneCenterYpx(lane: number, playHeight: number = PLAYFIELD_HEIGHT): number {
  return ((18 + lane * 16) / 100) * playHeight;
}

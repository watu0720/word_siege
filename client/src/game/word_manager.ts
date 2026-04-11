import type { WordRow } from "../api/client.ts";

function inRange(len: number, minL: number, maxL: number): boolean {
  return len >= minL && len <= maxL;
}

/** Pick a random word for wave index W (global difficulty). */
export function pickWord(words: WordRow[], W: number): string {
  const minLen = Math.min(12, 3 + Math.floor(W / 10));
  const maxLen = Math.min(15, 5 + Math.floor(W / 8));
  const pool = words.filter((r) => inRange(r.word.length, minLen, maxLen));
  const use = pool.length > 0 ? pool : words;
  const i = Math.floor(Math.random() * use.length);
  return use[i].word;
}

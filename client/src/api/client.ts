/** HTTP helpers with typed errors for WORD SIEGE APIs. */

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function parseJson(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function fetchHealth(): Promise<boolean> {
  try {
    const res = await fetch("/api/health", { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}

/** Tell server the browser tab is still open (watchdog). */
export function pingServer(): void {
  void fetch("/api/ping", { method: "POST", keepalive: true }).catch(() => {});
}

/** Stop Flask process (localhost dev server). Uses keepalive where supported. */
export async function requestServerShutdown(): Promise<boolean> {
  try {
    const res = await fetch("/api/shutdown", { method: "POST", keepalive: true });
    return res.ok;
  } catch {
    return false;
  }
}

export type EndlessRankRow = { name: string; score: number; wave: number; date: string };
export type StoryRankRow = {
  name: string;
  cleared_at: string;
  hit_rate?: number;
  accuracy?: number;
  time_sec: number;
};

export type BossRankRow = {
  name: string;
  boss_id: number;
  difficulty: string;
  time_sec: number;
  date: string;
};

export async function fetchRanking(
  mode: "endless" | "story" | "boss",
): Promise<EndlessRankRow[] | StoryRankRow[] | BossRankRow[]> {
  const res = await fetch(`/api/ranking/${mode}`);
  const data = (await parseJson(res)) as { items?: unknown[]; error?: string } | null;
  if (!res.ok) throw new ApiError(data?.error || "ランキング取得エラー", res.status);
  return (data?.items || []) as EndlessRankRow[] | StoryRankRow[];
}

export async function postEndlessRanking(
  name: string,
  score: number,
  wave: number,
): Promise<EndlessRankRow[]> {
  const res = await fetch("/api/ranking/endless", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, score, wave }),
  });
  const data = (await parseJson(res)) as { items?: EndlessRankRow[]; error?: string } | null;
  if (!res.ok) throw new ApiError(data?.error || "登録に失敗しました", res.status);
  return data?.items ?? [];
}

export async function postStoryRanking(
  name: string,
  hit_rate: number,
  time_sec: number,
): Promise<StoryRankRow[]> {
  const res = await fetch("/api/ranking/story", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, hit_rate, time_sec }),
  });
  const data = (await parseJson(res)) as { items?: StoryRankRow[]; error?: string } | null;
  if (!res.ok) throw new ApiError(data?.error || "登録に失敗しました", res.status);
  return data?.items ?? [];
}

export async function postBossRushRanking(
  name: string,
  time_sec: number,
  boss_id: number,
  difficulty: string,
): Promise<BossRankRow[]> {
  const res = await fetch("/api/ranking/boss", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, time_sec, boss_id, difficulty }),
  });
  const data = (await parseJson(res)) as { items?: BossRankRow[]; error?: string } | null;
  if (!res.ok) throw new ApiError(data?.error || "登録に失敗しました", res.status);
  return data?.items ?? [];
}

export type SavesData = { achievements: string[] };

export async function fetchSaves(): Promise<SavesData> {
  const res = await fetch("/api/saves");
  const data = (await parseJson(res)) as SavesData | null;
  if (!res.ok || !data) throw new ApiError("セーブの読み込みに失敗", res.status);
  return data;
}

export async function unlockAchievement(id: string): Promise<SavesData> {
  const res = await fetch("/api/saves/achievement", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  const data = (await parseJson(res)) as SavesData | null;
  if (!res.ok || !data) throw new ApiError("実績の保存に失敗", res.status);
  return data;
}

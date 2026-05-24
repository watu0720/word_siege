import type { JSX } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import type { BossRankRow, EndlessRankRow, StoryRankRow } from "../api/client.ts";
import { fetchRanking } from "../api/client.ts";
import { BOSS_SKIN_COUNT } from "../game/monster.ts";
import { ControlsHelp } from "./ControlsHelp.tsx";
import { DPad, type Direction } from "./DPad.tsx";

type Tab = "endless" | "story" | "boss";

type Props = {
  onBack: () => void;
};

const BOSS_DIFFS = ["easy", "normal", "hard", "expert"] as const;

export function RankingView({ onBack }: Props): JSX.Element {
  const [tab, setTab] = useState<Tab>("endless");
  const [endless, setEndless] = useState<EndlessRankRow[]>([]);
  const [story, setStory] = useState<StoryRankRow[]>([]);
  const [boss, setBoss] = useState<BossRankRow[]>([]);
  const [bossFilter, setBossFilter] = useState(1);
  const [diffFilter, setDiffFilter] = useState<string>("normal");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [e, s, b] = await Promise.all([
          fetchRanking("endless"),
          fetchRanking("story"),
          fetchRanking("boss"),
        ]);
        if (!cancelled) {
          setEndless(e as EndlessRankRow[]);
          setStory(s as StoryRankRow[]);
          setBoss(b as BossRankRow[]);
        }
      } catch (e) {
        if (!cancelled) setErr((e as Error).message || "読み込みエラー");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const bossRows = useMemo(() => {
    return boss
      .filter((r) => r.boss_id === bossFilter && r.difficulty === diffFilter)
      .sort((a, b) => a.time_sec - b.time_sec);
  }, [boss, bossFilter, diffFilter]);

  const moveTab = (d: Direction) => {
    if (tab === "boss") {
      if (d === "left") setBossFilter((x) => Math.max(1, x - 1));
      if (d === "right") setBossFilter((x) => Math.min(BOSS_SKIN_COUNT, x + 1));
      if (d === "up") {
        const i = BOSS_DIFFS.indexOf(diffFilter as (typeof BOSS_DIFFS)[number]);
        const n = i <= 0 ? BOSS_DIFFS.length - 1 : i - 1;
        setDiffFilter(BOSS_DIFFS[n]!);
      }
      if (d === "down") {
        const i = BOSS_DIFFS.indexOf(diffFilter as (typeof BOSS_DIFFS)[number]);
        const n = i < 0 ? 0 : (i + 1) % BOSS_DIFFS.length;
        setDiffFilter(BOSS_DIFFS[n]!);
      }
      return;
    }
    if (d === "left" || d === "up") setTab("endless");
    if (d === "right" || d === "down") setTab("story");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        e.preventDefault();
        onBack();
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        setTab((t) => (t === "endless" ? "story" : t === "story" ? "boss" : "endless"));
      }
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        if (tab === "boss") moveTab("left");
        else setTab("endless");
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        if (tab === "boss") moveTab("right");
        else setTab("story");
      }
      if (tab === "boss" && (e.key === "ArrowUp" || e.key === "w" || e.key === "W")) {
        e.preventDefault();
        moveTab("up");
      }
      if (tab === "boss" && (e.key === "ArrowDown" || e.key === "s" || e.key === "S")) {
        e.preventDefault();
        moveTab("down");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBack, tab]);

  return (
    <div class="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 flex flex-col items-center">
      <h2 class="text-3xl font-bold text-amber-400 mb-6">RANKING</h2>

      <div class="flex flex-wrap gap-2 mb-4 justify-center">
        <button
          type="button"
          onClick={() => setTab("endless")}
          class={`rounded-lg px-3 py-2 border text-sm ${tab === "endless" ? "border-amber-400 bg-amber-500/10" : "border-slate-600"}`}
        >
          ENDLESS
        </button>
        <button
          type="button"
          onClick={() => setTab("story")}
          class={`rounded-lg px-3 py-2 border text-sm ${tab === "story" ? "border-amber-400 bg-amber-500/10" : "border-slate-600"}`}
        >
          STORY
        </button>
        <button
          type="button"
          onClick={() => setTab("boss")}
          class={`rounded-lg px-3 py-2 border text-sm ${tab === "boss" ? "border-amber-400 bg-amber-500/10" : "border-slate-600"}`}
        >
          BOSS RUSH
        </button>
      </div>

      {tab === "boss" ? (
        <div class="flex flex-wrap gap-2 mb-4 justify-center text-xs font-mono text-slate-400">
          <span>BOSS:</span>
          {Array.from({ length: BOSS_SKIN_COUNT }, (_, i) => i + 1).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBossFilter(b)}
              class={`rounded px-2 py-1 border ${bossFilter === b ? "border-amber-400 text-amber-200" : "border-slate-600"}`}
            >
              {b}
            </button>
          ))}
          <span class="ml-2">難易度:</span>
          {BOSS_DIFFS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDiffFilter(d)}
              class={`rounded px-2 py-1 border uppercase ${diffFilter === d ? "border-amber-400 text-amber-200" : "border-slate-600"}`}
            >
              {d}
            </button>
          ))}
        </div>
      ) : null}

      {err ? <p class="text-red-400 mb-4">{err}</p> : null}

      <div class="w-full max-w-2xl overflow-x-auto rounded-lg border border-slate-700 mb-8">
        {tab === "endless" ? (
          <table class="w-full text-sm">
            <thead class="bg-slate-900 text-slate-400">
              <tr>
                <th class="p-2 text-left">#</th>
                <th class="p-2 text-left">NAME</th>
                <th class="p-2 text-right">SCORE</th>
                <th class="p-2 text-right">WAVE</th>
                <th class="p-2 text-left">DATE</th>
              </tr>
            </thead>
            <tbody>
              {endless.map((r, idx) => (
                <tr key={`${r.name}-${idx}`} class="border-t border-slate-800">
                  <td class="p-2">{idx + 1}</td>
                  <td class="p-2 font-mono">{r.name}</td>
                  <td class="p-2 text-right">{r.score}</td>
                  <td class="p-2 text-right">{r.wave}</td>
                  <td class="p-2 text-slate-400">{r.date}</td>
                </tr>
              ))}
              {endless.length === 0 ? (
                <tr>
                  <td colSpan={5} class="p-4 text-center text-slate-500">
                    まだ記録がありません
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        ) : tab === "story" ? (
          <table class="w-full text-sm">
            <thead class="bg-slate-900 text-slate-400">
              <tr>
                <th class="p-2 text-left">#</th>
                <th class="p-2 text-left">NAME</th>
                <th class="p-2 text-right">HIT</th>
                <th class="p-2 text-right">TIME</th>
                <th class="p-2 text-left">DATE</th>
              </tr>
            </thead>
            <tbody>
              {story.map((r, idx) => (
                <tr key={`${r.name}-${idx}`} class="border-t border-slate-800">
                  <td class="p-2">{idx + 1}</td>
                  <td class="p-2 font-mono">{r.name}</td>
                  <td class="p-2 text-right">
                    {`${((r.hit_rate ?? r.accuracy ?? 0) * 100).toFixed(1)}%`}
                  </td>
                  <td class="p-2 text-right">{r.time_sec}s</td>
                  <td class="p-2 text-slate-400">{r.cleared_at}</td>
                </tr>
              ))}
              {story.length === 0 ? (
                <tr>
                  <td colSpan={5} class="p-4 text-center text-slate-500">
                    まだ記録がありません
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        ) : (
          <table class="w-full text-sm">
            <thead class="bg-slate-900 text-slate-400">
              <tr>
                <th class="p-2 text-left">#</th>
                <th class="p-2 text-left">NAME</th>
                <th class="p-2 text-right">TIME</th>
                <th class="p-2 text-left">DATE</th>
              </tr>
            </thead>
            <tbody>
              {bossRows.map((r, idx) => (
                <tr key={`${r.name}-${r.time_sec}-${idx}`} class="border-t border-slate-800">
                  <td class="p-2">{idx + 1}</td>
                  <td class="p-2 font-mono">{r.name}</td>
                  <td class="p-2 text-right">{r.time_sec}s</td>
                  <td class="p-2 text-slate-400">{r.date}</td>
                </tr>
              ))}
              {bossRows.length === 0 ? (
                <tr>
                  <td colSpan={4} class="p-4 text-center text-slate-500">
                    この条件の記録はまだありません
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        )}
      </div>

      <button
        type="button"
        onClick={onBack}
        class="rounded-xl border border-slate-500 px-6 py-2 mb-8 hover:bg-slate-800"
      >
        TITLE へ戻る
      </button>

      <p class="text-[10px] text-slate-500 mb-4 text-center max-w-md">
        [Tab] でタブ切替 · BOSS RUSH タブでは十字キーで BOSS / 難易度フィルタ
      </p>

      <div class="flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center">
        <ControlsHelp variant="ranking" className="max-w-md w-full sm:flex-1" />
        <div class="flex flex-col items-center gap-2">
          <span class="text-[10px] uppercase tracking-widest text-slate-500">操作</span>
          <DPad variant="cross" onDirection={moveTab} />
        </div>
      </div>
    </div>
  );
}

import type { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import type { EndlessRankRow, StoryRankRow } from "../api/client.ts";
import { fetchRanking } from "../api/client.ts";
import { ControlsHelp } from "./ControlsHelp.tsx";
import { DPad, type Direction } from "./DPad.tsx";

type Tab = "endless" | "story";

type Props = {
  onBack: () => void;
};

export function RankingView({ onBack }: Props): JSX.Element {
  const [tab, setTab] = useState<Tab>("endless");
  const [endless, setEndless] = useState<EndlessRankRow[]>([]);
  const [story, setStory] = useState<StoryRankRow[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [e, s] = await Promise.all([
          fetchRanking("endless"),
          fetchRanking("story"),
        ]);
        if (!cancelled) {
          setEndless(e as EndlessRankRow[]);
          setStory(s as StoryRankRow[]);
        }
      } catch (e) {
        if (!cancelled) setErr((e as Error).message || "読み込みエラー");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const moveTab = (d: Direction) => {
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
        setTab((t) => (t === "endless" ? "story" : "endless"));
      }
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        setTab("endless");
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        setTab("story");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBack]);

  return (
    <div class="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 flex flex-col items-center">
      <h2 class="text-3xl font-bold text-amber-400 mb-6">RANKING</h2>

      <div class="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setTab("endless")}
          class={`rounded-lg px-4 py-2 border ${tab === "endless" ? "border-amber-400 bg-amber-500/10" : "border-slate-600"}`}
        >
          ENDLESS
        </button>
        <button
          type="button"
          onClick={() => setTab("story")}
          class={`rounded-lg px-4 py-2 border ${tab === "story" ? "border-amber-400 bg-amber-500/10" : "border-slate-600"}`}
        >
          STORY
        </button>
      </div>

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
        ) : (
          <table class="w-full text-sm">
            <thead class="bg-slate-900 text-slate-400">
              <tr>
                <th class="p-2 text-left">#</th>
                <th class="p-2 text-left">NAME</th>
                <th class="p-2 text-right">ACC</th>
                <th class="p-2 text-right">TIME</th>
                <th class="p-2 text-left">DATE</th>
              </tr>
            </thead>
            <tbody>
              {story.map((r, idx) => (
                <tr key={`${r.name}-${idx}`} class="border-t border-slate-800">
                  <td class="p-2">{idx + 1}</td>
                  <td class="p-2 font-mono">{r.name}</td>
                  <td class="p-2 text-right">{(r.accuracy * 100).toFixed(1)}%</td>
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
        )}
      </div>

      <button
        type="button"
        onClick={onBack}
        class="rounded-xl border border-slate-500 px-6 py-2 mb-8 hover:bg-slate-800"
      >
        TITLE へ戻る
      </button>

      <div class="flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center">
        <ControlsHelp variant="ranking" className="max-w-md w-full sm:flex-1" />
        <div class="flex flex-col items-center gap-2">
          <span class="text-[10px] uppercase tracking-widest text-slate-500">タブ切替</span>
          <DPad variant="cross" onDirection={moveTab} />
        </div>
      </div>
    </div>
  );
}

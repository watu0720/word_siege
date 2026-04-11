import type { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { ControlsHelp } from "./ControlsHelp.tsx";
import { DPad, type Direction } from "./DPad.tsx";

export type ResultPayload = {
  outcome: "gameover" | "ending" | "quit";
  score: number;
  waveReached: number;
  accuracy: number;
  timeSec: number;
  mode: "story" | "endless";
  stage: number;
};

type Props = {
  data: ResultPayload;
  onRetry: () => void;
  onTitle: () => void;
  onSubmitEndless?: (name: string) => Promise<void>;
  onSubmitStory?: (name: string) => Promise<void>;
};

const MENU = [
  { id: "retry" as const, label: "RETRY" },
  { id: "title" as const, label: "TITLE" },
];

export function Result({
  data,
  onRetry,
  onTitle,
  onSubmitEndless,
  onSubmitStory,
}: Props): JSX.Element {
  const [i, setI] = useState(0);
  const [name, setName] = useState("AAA");
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const showEndlessSubmit = data.outcome === "gameover" && data.mode === "endless" && onSubmitEndless;
  const showStorySubmit = data.outcome === "ending" && onSubmitStory;

  const move = (d: Direction) => {
    if (d === "up") setI((x) => (x - 1 + MENU.length) % MENU.length);
    if (d === "down") setI((x) => (x + 1) % MENU.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        move("up");
      }
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        move("down");
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (MENU[i].id === "retry") onRetry();
        else onTitle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, onRetry, onTitle]);

  const submit = async () => {
    const n = name.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8) || "AAA";
    setBusy(true);
    setErr(null);
    try {
      if (showEndlessSubmit && onSubmitEndless) {
        await onSubmitEndless(n);
      } else if (showStorySubmit && onSubmitStory) {
        await onSubmitStory(n);
      }
      setSubmitted(true);
    } catch (e) {
      setErr((e as Error).message || "送信に失敗しました");
    } finally {
      setBusy(false);
    }
  };

  const title =
    data.outcome === "ending"
      ? "STORY 全クリア！"
      : data.outcome === "quit"
      ? "中断"
      : "GAME OVER";

  return (
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 pb-8">
      <h2 class="text-4xl font-black text-amber-400 mb-2">{title}</h2>
      <div class="text-slate-400 mb-6 font-mono text-sm space-y-1 text-center">
        <div>到達ウェーブ: {data.waveReached}</div>
        <div>スコア: {data.score}</div>
        <div>
          正確率:{" "}
          {data.accuracy > 0 ? `${(data.accuracy * 100).toFixed(1)}%` : "—"}
        </div>
        {data.mode === "story" ? <div>プレイ時間: {data.timeSec}s</div> : null}
      </div>

      {(showEndlessSubmit || showStorySubmit) && !submitted ? (
        <div class="mb-6 flex flex-col items-center gap-2 w-full max-w-xs">
          <label class="text-sm text-slate-400">名前（英大文字・最大8）</label>
          <input
            class="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 font-mono uppercase"
            maxLength={8}
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value.toUpperCase())}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => void submit()}
            class="rounded-lg border border-amber-500 px-4 py-2 text-amber-200 hover:bg-amber-500/10 disabled:opacity-50"
          >
            ランキングに登録
          </button>
          {err ? <p class="text-red-400 text-sm">{err}</p> : null}
        </div>
      ) : null}

      {submitted ? <p class="text-emerald-400 text-sm mb-4">登録しました</p> : null}

      <div class="flex flex-col gap-2 w-full max-w-sm mb-8">
        {MENU.map((m, idx) => (
          <button
            key={m.id}
            type="button"
            onClick={() => (m.id === "retry" ? onRetry() : onTitle())}
            class={`rounded-xl border px-5 py-3 text-left font-mono ${
              idx === i
                ? "border-amber-400 bg-amber-500/10 text-amber-100"
                : "border-slate-600 bg-slate-900/40 text-slate-300"
            }`}
          >
            [{m.label}]
          </button>
        ))}
      </div>

      <div class="flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center">
        <ControlsHelp variant="result" className="max-w-md w-full sm:flex-1" />
        <div class="flex flex-col items-center gap-2">
          <span class="text-[10px] uppercase tracking-widest text-slate-500">十字操作</span>
          <DPad variant="vertical" onDirection={move} />
        </div>
      </div>
    </div>
  );
}

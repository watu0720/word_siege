import type { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { requestServerShutdown } from "../api/client.ts";
import { ControlsHelp } from "./ControlsHelp.tsx";
import { DPad, type Direction } from "./DPad.tsx";

const ITEMS = [
  { id: "story" as const, label: "STORY MODE" },
  { id: "endless" as const, label: "ENDLESS MODE" },
  { id: "boss_rush" as const, label: "BOSS RUSH" },
  { id: "ranking" as const, label: "RANKING" },
];

type Props = {
  onPick: (id: "story" | "endless" | "boss_rush" | "ranking") => void;
};

export function Title({ onPick }: Props): JSX.Element {
  const [i, setI] = useState(0);
  const [serverStopped, setServerStopped] = useState(false);
  const [stopBusy, setStopBusy] = useState(false);

  const move = (d: Direction) => {
    if (d === "up") setI((x) => (x - 1 + ITEMS.length) % ITEMS.length);
    if (d === "down") setI((x) => (x + 1) % ITEMS.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
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
        onPick(ITEMS[i].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, onPick]);

  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 pb-8">
      <h1 class="text-5xl sm:text-6xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 drop-shadow-[0_0_24px_rgba(251,191,36,0.35)]">
        WORD SIEGE
      </h1>
      <p class="text-slate-400 mb-10 text-center max-w-md">
        タイピングで敵を撃退するタワーディフェンス
      </p>

      <nav class="flex flex-col gap-3 w-full max-w-sm mb-8" aria-label="メインメニュー">
        {ITEMS.map((it, idx) => (
          <button
            key={it.id}
            type="button"
            onClick={() => onPick(it.id)}
            class={`rounded-xl border px-6 py-3 text-left font-mono tracking-wide transition ${
              idx === i
                ? "border-amber-400 bg-amber-500/15 text-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                : "border-slate-600 bg-slate-900/50 text-slate-300 hover:border-slate-500"
            }`}
          >
            [{it.label}]
          </button>
        ))}
      </nav>

      <div class="flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center">
        <ControlsHelp variant="title" className="max-w-md w-full sm:flex-1" />
        <div class="flex flex-col items-center gap-2">
          <span class="text-[10px] uppercase tracking-widest text-slate-500">十字操作</span>
          <DPad variant="vertical" onDirection={move} />
        </div>
      </div>

      <div class="mt-10 w-full max-w-sm text-center border-t border-slate-800 pt-6">
        <p class="text-xs text-slate-500 mb-2">
          タブを閉じると ping が止まり、しばらくするとサーバーが自動終了します（サーバー用の黒い窓も閉じます）。すぐ止める場合は下のボタンを使います。
        </p>
        {serverStopped ? (
          <p class="text-sm text-amber-300/90 mb-2">
            サーバーは停止しました。このタブは手動で閉じてください（自動では閉じられないことがあります）。
          </p>
        ) : null}
        <button
          type="button"
          disabled={stopBusy || serverStopped}
          class="text-sm text-slate-400 underline underline-offset-2 hover:text-amber-300 disabled:opacity-40 disabled:no-underline"
          onClick={() => {
            void (async () => {
              if (
                !confirm(
                  "Flask サーバーを終了しますか？\n（続けるときは start.bat から再起動してください）",
                )
              ) {
                return;
              }
              setStopBusy(true);
              await requestServerShutdown();
              setStopBusy(false);
              setServerStopped(true);
              window.close();
            })();
          }}
        >
          {stopBusy ? "終了処理中…" : "サーバーを終了する"}
        </button>
      </div>
    </div>
  );
}

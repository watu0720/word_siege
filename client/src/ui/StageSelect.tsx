import type { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { ControlsHelp } from "./ControlsHelp.tsx";
import { DPad, type Direction } from "./DPad.tsx";

const STAGES = [1, 2, 3, 4, 5];

type Props = {
  onSelect: (stage: number) => void;
  onBack: () => void;
};

export function StageSelect({ onSelect, onBack }: Props): JSX.Element {
  const [i, setI] = useState(0);

  const move = (d: Direction) => {
    if (d === "up") setI((x) => (x - 1 + STAGES.length + 1) % (STAGES.length + 1));
    if (d === "down") setI((x) => (x + 1) % (STAGES.length + 1));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onBack();
        return;
      }
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
        if (i === STAGES.length) onBack();
        else onSelect(STAGES[i]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, onSelect, onBack]);

  return (
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 pb-8">
      <h2 class="text-3xl font-bold text-amber-400 mb-2">STORY MODE</h2>
      <p class="text-slate-400 mb-8">ステージを選んでください（各10ウェーブ）</p>

      <div class="flex flex-col gap-2 w-full max-w-sm mb-8">
        {STAGES.map((s, idx) => (
          <button
            key={s}
            type="button"
            onClick={() => onSelect(s)}
            class={`rounded-xl border px-5 py-3 text-left font-mono ${
              idx === i
                ? "border-amber-400 bg-amber-500/10 text-amber-100"
                : "border-slate-600 bg-slate-900/40 text-slate-300"
            }`}
          >
            STAGE {s}
          </button>
        ))}
        <button
          type="button"
          onClick={onBack}
          class={`rounded-xl border px-5 py-3 text-left font-mono ${
            i === STAGES.length
              ? "border-amber-400 bg-amber-500/10 text-amber-100"
              : "border-slate-600 bg-slate-900/40 text-slate-300"
          }`}
        >
          ← TITLE
        </button>
      </div>

      <div class="flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center">
        <ControlsHelp variant="stage" className="max-w-md w-full sm:flex-1" />
        <div class="flex flex-col items-center gap-2">
          <span class="text-[10px] uppercase tracking-widest text-slate-500">十字操作</span>
          <DPad variant="vertical" onDirection={move} />
        </div>
      </div>
    </div>
  );
}

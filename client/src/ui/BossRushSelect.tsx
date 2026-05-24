import type { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import type { BossRushDifficulty } from "../game/monster.ts";
import { BOSS_SKIN_COUNT } from "../game/monster.ts";
import { ControlsHelp } from "./ControlsHelp.tsx";
import { DPad, type Direction } from "./DPad.tsx";

type Step = "boss" | "difficulty";

type Props = {
  onStart: (bossId: number, difficulty: BossRushDifficulty) => void;
  onBack: () => void;
};

const DIFFS: { id: BossRushDifficulty; label: string }[] = [
  { id: "easy", label: "イージー（HP 少）" },
  { id: "normal", label: "ノーマル" },
  { id: "hard", label: "ハード" },
  { id: "expert", label: "エキスパート（HP 多）" },
];

export function BossRushSelect({ onStart, onBack }: Props): JSX.Element {
  const [step, setStep] = useState<Step>("boss");
  const [bossIdx, setBossIdx] = useState(0);
  const [diffIdx, setDiffIdx] = useState(0);

  const backIdx = BOSS_SKIN_COUNT;

  const move = (d: Direction) => {
    if (step === "boss") {
      if (d === "up") setBossIdx((x) => (x - 1 + backIdx + 1) % (backIdx + 1));
      if (d === "down") setBossIdx((x) => (x + 1) % (backIdx + 1));
    } else {
      if (d === "up") setDiffIdx((x) => (x - 1 + DIFFS.length) % DIFFS.length);
      if (d === "down") setDiffIdx((x) => (x + 1) % DIFFS.length);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (step === "difficulty") setStep("boss");
        else onBack();
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
        if (step === "boss") {
          if (bossIdx === backIdx) onBack();
          else setStep("difficulty");
        } else {
          onStart(bossIdx + 1, DIFFS[diffIdx]!.id);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, bossIdx, diffIdx, onBack, onStart, backIdx]);

  return (
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 pb-8">
      <h2 class="text-3xl font-bold text-amber-400 mb-2">BOSS RUSH</h2>
      <p class="text-slate-400 mb-8 text-center max-w-md">
        {step === "boss"
          ? "対戦するボスを選んでください"
          : `BOSS ${bossIdx + 1} — 難易度（HP で変化）`}
      </p>

      {step === "boss" ? (
        <div class="flex flex-col gap-2 w-full max-w-sm mb-8">
          {Array.from({ length: BOSS_SKIN_COUNT }, (_, i) => i + 1).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => {
                setBossIdx(b - 1);
                setStep("difficulty");
              }}
              class={`rounded-xl border px-5 py-3 text-left font-mono ${
                b - 1 === bossIdx
                  ? "border-amber-400 bg-amber-500/10 text-amber-100"
                  : "border-slate-600 bg-slate-900/40 text-slate-300"
              }`}
            >
              BOSS {b}
            </button>
          ))}
          <button
            type="button"
            onClick={onBack}
            class={`rounded-xl border px-5 py-3 text-left font-mono ${
              bossIdx === backIdx
                ? "border-amber-400 bg-amber-500/10 text-amber-100"
                : "border-slate-600 bg-slate-900/40 text-slate-300"
            }`}
          >
            ← TITLE
          </button>
        </div>
      ) : (
        <div class="flex flex-col gap-2 w-full max-w-sm mb-8">
          {DIFFS.map((d, idx) => (
            <button
              key={d.id}
              type="button"
              onClick={() => onStart(bossIdx + 1, d.id)}
              class={`rounded-xl border px-5 py-3 text-left font-mono ${
                idx === diffIdx
                  ? "border-amber-400 bg-amber-500/10 text-amber-100"
                  : "border-slate-600 bg-slate-900/40 text-slate-300"
              }`}
            >
              {d.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setStep("boss")}
            class="rounded-xl border border-slate-600 bg-slate-900/40 px-5 py-3 text-left font-mono text-slate-300"
          >
            ← ボス選択へ
          </button>
        </div>
      )}

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

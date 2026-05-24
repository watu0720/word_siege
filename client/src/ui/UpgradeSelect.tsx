import type { JSX } from "preact";
import type { UpgradeId } from "../game/upgrades.ts";
import { UPGRADE_DEFS } from "../game/upgrades.ts";

type Props = {
  waveGlobal: number;
  choices: UpgradeId[];
  stacks: Record<UpgradeId, number>;
  selectedIdx: number;
  onSelectIndex: (idx: number) => void;
  onConfirm: (id: UpgradeId) => void;
};

export function UpgradeSelectOverlay({
  waveGlobal,
  choices,
  stacks,
  selectedIdx,
  onSelectIndex,
  onConfirm,
}: Props): JSX.Element {
  return (
    <div class="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/75 px-3 py-6">
      <h3 class="text-xl sm:text-2xl font-black text-cyan-300 mb-2 text-center drop-shadow-lg">
        強化を選択してください
      </h3>
      <p class="text-slate-400 text-sm font-mono mb-6">WAVE {waveGlobal} クリア</p>
      <div class="flex flex-row flex-nowrap gap-3 justify-center max-w-5xl w-full overflow-x-auto pb-1">
        {choices.map((id, idx) => {
          const def = UPGRADE_DEFS[id];
          const st = stacks[id] ?? 0;
          const sel = idx === selectedIdx;
          return (
            <button
              key={`${id}-${idx}`}
              type="button"
              onClick={() => {
                onSelectIndex(idx);
                onConfirm(id);
              }}
              onMouseEnter={() => onSelectIndex(idx)}
              class={`flex flex-col items-stretch rounded-xl border-2 p-3 sm:p-4 w-[min(100%,11rem)] sm:w-44 text-left transition-colors ${
                sel
                  ? "border-cyan-400 bg-cyan-950/50 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                  : "border-slate-600 bg-slate-900/80 hover:border-slate-500"
              }`}
            >
              <div class="text-3xl mb-1 text-center">{def.icon}</div>
              <div class="font-bold text-amber-200 text-sm leading-tight mb-1">{def.name}</div>
              <p class="text-[11px] text-slate-400 leading-snug flex-1">{def.description}</p>
              <div class="mt-2 text-[10px] font-mono text-slate-500">
                所持: ×{st}
                {def.maxStacks < 900 ? ` / 最大 ${def.maxStacks}` : ""}
              </div>
            </button>
          );
        })}
      </div>
      <p class="mt-6 text-xs text-slate-500 text-center">
        ←→ / A D で選択 · Enter またはカードをクリックで決定
      </p>
    </div>
  );
}

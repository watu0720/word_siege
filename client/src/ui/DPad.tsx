import type { JSX } from "preact";

export type Direction = "up" | "down" | "left" | "right";

type Props = {
  onDirection: (d: Direction) => void;
  disabled?: boolean;
  /** Show only vertical (title menus) or full cross (tabs). */
  variant?: "vertical" | "cross";
  className?: string;
};

function Btn({
  label,
  sub,
  onClick,
  disabled,
  rounded,
}: {
  label: string;
  sub?: string;
  onClick: () => void;
  disabled?: boolean;
  rounded: string;
}): JSX.Element {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onClick()}
      class={`flex flex-col items-center justify-center border border-amber-500/60 bg-slate-900/90 text-amber-100 shadow-inner transition hover:bg-slate-800 active:scale-95 disabled:opacity-40 disabled:pointer-events-none ${rounded} min-w-[3rem] min-h-[2.5rem] touch-manipulation select-none`}
      aria-label={label}
    >
      <span class="text-lg leading-none">{label}</span>
      {sub ? <span class="text-[10px] text-slate-400 mt-0.5">{sub}</span> : null}
    </button>
  );
}

export function DPad({ onDirection, disabled, variant = "cross", className = "" }: Props): JSX.Element {
  const v = variant === "vertical";
  return (
    <div
      class={`inline-grid gap-1 ${v ? "grid-cols-1" : "grid-cols-3"} place-items-center ${className}`}
      role="group"
      aria-label="十字キー（画面操作）"
    >
      {!v && (
        <div class="col-start-2">
          <Btn label="上" sub="W" onClick={() => onDirection("up")} disabled={disabled} rounded="rounded-lg" />
        </div>
      )}
      {v && (
        <Btn label="上" sub="W" onClick={() => onDirection("up")} disabled={disabled} rounded="rounded-lg" />
      )}
      {!v && (
        <>
          <Btn label="左" sub="A" onClick={() => onDirection("left")} disabled={disabled} rounded="rounded-lg" />
          <div class="w-12 h-10 rounded-lg border border-dashed border-slate-600 bg-slate-950/50 flex items-center justify-center text-[10px] text-slate-500">
            WASD
          </div>
          <Btn label="右" sub="D" onClick={() => onDirection("right")} disabled={disabled} rounded="rounded-lg" />
        </>
      )}
      <div class={v ? "" : "col-start-2"}>
        <Btn label="下" sub="S" onClick={() => onDirection("down")} disabled={disabled} rounded="rounded-lg" />
      </div>
    </div>
  );
}

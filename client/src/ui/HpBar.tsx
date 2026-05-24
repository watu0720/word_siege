import type { JSX } from "preact";

export type HpBarVariant = "normal" | "elite" | "boss";

export function MonsterHpBar({
  hp,
  maxHp,
  variant,
  showNumeric,
}: {
  hp: number;
  maxHp: number;
  variant: HpBarVariant;
  showNumeric?: boolean;
}): JSX.Element {
  const pct = maxHp > 0 ? Math.max(0, Math.min(100, (hp / maxHp) * 100)) : 0;
  const fill =
    variant === "boss"
      ? "bg-red-500"
      : variant === "elite"
        ? "bg-orange-500"
        : "bg-emerald-500";
  const barMaxW = variant === "boss" ? "max-w-[5.75rem]" : "max-w-[4.5rem]";
  return (
    <div class={`flex flex-col items-center gap-0.5 ${variant === "boss" ? "min-w-[4.25rem]" : "min-w-[3.5rem]"}`}>
      <div class={`w-full ${barMaxW} h-1.5 bg-slate-900 rounded overflow-hidden border border-slate-700/90`}>
        <div class={`h-full ${fill} transition-[width] duration-75`} style={{ width: `${pct}%` }} />
      </div>
      {showNumeric ? (
        <span class="text-[9px] font-mono text-red-200 tabular-nums">
          {hp}/{maxHp}
        </span>
      ) : null}
    </div>
  );
}

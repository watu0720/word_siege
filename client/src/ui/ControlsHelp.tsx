import type { JSX } from "preact";

export type HelpVariant = "title" | "stage" | "game" | "game_pause" | "ranking" | "result";

const LINES: Record<HelpVariant, string[]> = {
  title: [
    "十字（↑↓ または W / S）でメニュー移動",
    "Enter で決定",
    "画面の十字ボタンでも同じ操作ができます",
  ],
  stage: [
    "十字（↑↓ または W / S）でステージを選択",
    "Enter で開始 · Esc でタイトルへ",
    "画面の十字ボタンでも移動できます",
  ],
  game: [
    "WASD / 矢印（長押し可）で自機を上下左右に移動",
    "Enter で弾を発射（クールダウンあり）",
    "敵の弾に当たるとライフが減ります",
    "Esc でポーズ（取得強化の確認可）",
  ],
  game_pause: [
    "十字（↑↓ または W / S）で項目選択",
    "Enter で決定",
    "Esc でも再開できます",
    "BOSS RUSH 中は RETRY で同じボス・難易度からやり直し",
    "画面の十字ボタンでも移動できます",
  ],
  ranking: [
    "Tab または ← →（A / D）でタブ切替",
    "Enter または Esc でタイトルへ",
    "画面の十字ボタンでもタブを切り替えられます",
  ],
  result: [
    "十字（↑↓ または W / S）で項目選択",
    "Enter で決定",
    "画面の十字ボタンでも移動できます",
  ],
};

export function ControlsHelp({
  variant,
  className = "",
}: {
  variant: HelpVariant;
  className?: string;
}): JSX.Element {
  const lines = LINES[variant];
  return (
    <aside
      class={`rounded-lg border border-slate-600/80 bg-slate-950/80 px-3 py-2 text-xs text-slate-300 shadow-lg ${className}`}
      aria-label="操作方法"
    >
      <div class="font-semibold text-amber-400/90 mb-1.5 tracking-wide">操作方法</div>
      <ul class="list-disc pl-4 space-y-0.5">
        {lines.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </aside>
  );
}

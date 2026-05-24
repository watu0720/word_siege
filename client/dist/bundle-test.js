// client/src/main.tsx
import { render } from "preact";
import { useCallback as useCallback2, useEffect as useEffect8, useState as useState7 } from "preact/hooks";

// client/src/api/client.ts
var ApiError = class extends Error {
  status;
  code;
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
};
async function parseJson(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
async function fetchHealth() {
  try {
    const res = await fetch("/api/health", { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}
function pingServer() {
  void fetch("/api/ping", { method: "POST", keepalive: true }).catch(() => {
  });
}
async function requestServerShutdown() {
  try {
    const res = await fetch("/api/shutdown", { method: "POST", keepalive: true });
    return res.ok;
  } catch {
    return false;
  }
}
async function fetchRanking(mode) {
  const res = await fetch(`/api/ranking/${mode}`);
  const data = await parseJson(res);
  if (!res.ok) throw new ApiError(data?.error || "\u30E9\u30F3\u30AD\u30F3\u30B0\u53D6\u5F97\u30A8\u30E9\u30FC", res.status);
  return data?.items || [];
}
async function postEndlessRanking(name, score, wave) {
  const res = await fetch("/api/ranking/endless", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, score, wave })
  });
  const data = await parseJson(res);
  if (!res.ok) throw new ApiError(data?.error || "\u767B\u9332\u306B\u5931\u6557\u3057\u307E\u3057\u305F", res.status);
  return data?.items ?? [];
}
async function postStoryRanking(name, hit_rate, time_sec) {
  const res = await fetch("/api/ranking/story", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, hit_rate, time_sec })
  });
  const data = await parseJson(res);
  if (!res.ok) throw new ApiError(data?.error || "\u767B\u9332\u306B\u5931\u6557\u3057\u307E\u3057\u305F", res.status);
  return data?.items ?? [];
}
async function postBossRushRanking(name, time_sec, boss_id, difficulty) {
  const res = await fetch("/api/ranking/boss", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, time_sec, boss_id, difficulty })
  });
  const data = await parseJson(res);
  if (!res.ok) throw new ApiError(data?.error || "\u767B\u9332\u306B\u5931\u6557\u3057\u307E\u3057\u305F", res.status);
  return data?.items ?? [];
}
async function unlockAchievement(id) {
  const res = await fetch("/api/saves/achievement", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
  const data = await parseJson(res);
  if (!res.ok || !data) throw new ApiError("\u5B9F\u7E3E\u306E\u4FDD\u5B58\u306B\u5931\u6557", res.status);
  return data;
}

// client/src/ui/BossRushSelect.tsx
import { useEffect, useState } from "preact/hooks";

// client/src/game/playfield.ts
var PLAYFIELD_WIDTH = 960;
var PLAYFIELD_HEIGHT = 540;
var STORY_STAGE_DIFFICULTY_OFFSET = 8;
var PLAYER_HIT_RADIUS = 26;
var ENEMY_BULLET_HIT_RADIUS = 16;
var BOSS_BURGER_BULLET_HIT_RADIUS = 24;
var MONSTER_DESPAWN_X = -60;

// client/src/game/lanes.ts
function laneCenterYpx(lane, playHeight = PLAYFIELD_HEIGHT) {
  return (18 + lane * 16) / 100 * playHeight;
}

// client/src/game/monster.ts
var ENEMY_SKIN_COUNT = 6;
var BOSS_SKIN_COUNT = 4;
var RARE_SPAWN_CHANCE = 0.12;
var _id = 0;
function nextMonsterId() {
  _id += 1;
  return `m-${_id}`;
}
function pickNormalSkin() {
  return 1 + Math.floor(Math.random() * ENEMY_SKIN_COUNT);
}
function pickBossSkin() {
  return 1 + Math.floor(Math.random() * BOSS_SKIN_COUNT);
}
function monsterWorldY(m, playHeight) {
  if (m.isBoss && m.bossY !== void 0) return m.bossY;
  if (m.isBoss) return playHeight + 100;
  return laneCenterYpx(m.lane, playHeight);
}
function normalMonsterHp(waveGlobal) {
  const raw = 1 + Math.floor(waveGlobal / 8);
  return Math.min(5, Math.max(2, raw));
}
function rareMonsterHp(normalHp, waveGlobal) {
  const scaling = 2.75 + Math.min(4.2, waveGlobal * 0.13);
  return Math.min(36, Math.max(5, Math.ceil(normalHp * scaling)));
}
function eliteMonsterHp(normalHp) {
  return Math.max(3, normalHp * 3);
}
function bossMonsterHp(waveGlobal, tenWaveBonus) {
  let hp = Math.min(58, 16 + Math.floor(waveGlobal * 2.35));
  if (tenWaveBonus) {
    hp = Math.min(92, Math.floor(hp * 1.55) + 18);
  }
  return Math.max(hp, 22);
}
function eliteSpawnRate(waveGlobal) {
  return Math.min(0.25, 0.05 + waveGlobal * 5e-3);
}
function enemyFireIntervalSec(isBoss, isElite, waveGlobal) {
  const w = Math.max(0.5, 1 - waveGlobal * 0.012);
  if (isBoss) return Math.max(0.32, 0.5 * w);
  if (isElite) return Math.max(0.55, 1.05 * w);
  return Math.max(0.95, 2.15 * w);
}
function spawnMonster(playWidth, waveGlobal, isBoss, lane, bossIsTenWave = false) {
  let speed = Math.min(200, 40 + waveGlobal * 3);
  let isElite = false;
  let isRare = false;
  let maxHp;
  let skinIndex;
  if (isBoss) {
    maxHp = bossMonsterHp(waveGlobal, bossIsTenWave);
    skinIndex = pickBossSkin();
  } else {
    skinIndex = pickNormalSkin();
    const nhp = normalMonsterHp(waveGlobal);
    if (Math.random() < RARE_SPAWN_CHANCE) {
      isRare = true;
      maxHp = rareMonsterHp(nhp, waveGlobal);
      const rareSpdMul = 1.12 + Math.min(0.18, waveGlobal * 55e-4);
      speed = Math.min(200, speed * rareSpdMul);
    } else if (Math.random() < eliteSpawnRate(waveGlobal)) {
      isElite = true;
      maxHp = eliteMonsterHp(nhp);
    } else {
      maxHp = nhp;
    }
  }
  const enemyFireInterval = enemyFireIntervalSec(isBoss, isElite, waveGlobal);
  const enemyFireTimer = 0.4 + Math.random() * 1.1;
  if (isBoss) {
    const anchorX = playWidth * 0.82;
    const base = {
      id: nextMonsterId(),
      x: anchorX,
      lane,
      hp: maxHp,
      maxHp,
      isBoss: true,
      isElite: false,
      speed: 0,
      skinIndex,
      isRare: false,
      enemyFireTimer,
      enemyFireInterval,
      bossY: PLAYFIELD_HEIGHT + 100,
      bossVy: 78,
      bossPhase: "rising"
    };
    return skinIndex === 1 ? { ...base, boss1BurgerCd: 0.85 } : base;
  }
  return {
    id: nextMonsterId(),
    x: playWidth - 24 - Math.random() * 48,
    lane,
    hp: maxHp,
    maxHp,
    isBoss,
    isElite,
    speed,
    skinIndex,
    isRare,
    enemyFireTimer,
    enemyFireInterval
  };
}
var BOSS_RUSH_HP_MULT = {
  easy: 0.52,
  normal: 1,
  hard: 1.72,
  expert: 2.48
};
function spawnBossRushMonster(playWidth, bossId, difficulty) {
  const clampedId = Math.max(1, Math.min(BOSS_SKIN_COUNT, bossId));
  const baseHp = 50;
  const maxHp = Math.max(14, Math.round(baseHp * BOSS_RUSH_HP_MULT[difficulty]));
  const W = 22;
  const enemyFireInterval = enemyFireIntervalSec(true, false, W);
  const anchorX = playWidth * 0.82;
  return {
    id: nextMonsterId(),
    x: anchorX,
    lane: 1,
    hp: maxHp,
    maxHp,
    isBoss: true,
    isElite: false,
    speed: 0,
    skinIndex: clampedId,
    isRare: false,
    enemyFireTimer: 0.35 + Math.random() * 0.4,
    enemyFireInterval,
    bossY: PLAYFIELD_HEIGHT + 100,
    bossVy: 88,
    bossPhase: "rising",
    ...clampedId === 1 ? { boss1BurgerCd: 0.9 } : {}
  };
}
function monsterImagePath(m) {
  if (m.isRare) return "/assets/enemies/rare.png";
  if (m.isBoss) return `/assets/enemies/boss${m.skinIndex}.png`;
  return `/assets/enemies/${m.skinIndex}.png`;
}
function monsterDisplayScale(m) {
  if (m.isBoss) return 1.78;
  if (m.isElite) return 1.32;
  return 1;
}

// client/src/ui/ControlsHelp.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
var LINES = {
  title: [
    "\u5341\u5B57\uFF08\u2191\u2193 \u307E\u305F\u306F W / S\uFF09\u3067\u30E1\u30CB\u30E5\u30FC\u79FB\u52D5",
    "Enter \u3067\u6C7A\u5B9A",
    "\u753B\u9762\u306E\u5341\u5B57\u30DC\u30BF\u30F3\u3067\u3082\u540C\u3058\u64CD\u4F5C\u304C\u3067\u304D\u307E\u3059"
  ],
  stage: [
    "\u5341\u5B57\uFF08\u2191\u2193 \u307E\u305F\u306F W / S\uFF09\u3067\u30B9\u30C6\u30FC\u30B8\u3092\u9078\u629E",
    "Enter \u3067\u958B\u59CB \xB7 Esc \u3067\u30BF\u30A4\u30C8\u30EB\u3078",
    "\u753B\u9762\u306E\u5341\u5B57\u30DC\u30BF\u30F3\u3067\u3082\u79FB\u52D5\u3067\u304D\u307E\u3059"
  ],
  game: [
    "WASD / \u77E2\u5370\uFF08\u9577\u62BC\u3057\u53EF\uFF09\u3067\u81EA\u6A5F\u3092\u4E0A\u4E0B\u5DE6\u53F3\u306B\u79FB\u52D5",
    "Enter \u3067\u5F3E\u3092\u767A\u5C04\uFF08\u30AF\u30FC\u30EB\u30C0\u30A6\u30F3\u3042\u308A\uFF09",
    "\u6575\u306E\u5F3E\u306B\u5F53\u305F\u308B\u3068\u30E9\u30A4\u30D5\u304C\u6E1B\u308A\u307E\u3059",
    "Esc \u3067\u30DD\u30FC\u30BA\uFF08\u53D6\u5F97\u5F37\u5316\u306E\u78BA\u8A8D\u53EF\uFF09"
  ],
  game_pause: [
    "\u5341\u5B57\uFF08\u2191\u2193 \u307E\u305F\u306F W / S\uFF09\u3067\u9805\u76EE\u9078\u629E",
    "Enter \u3067\u6C7A\u5B9A",
    "Esc \u3067\u3082\u518D\u958B\u3067\u304D\u307E\u3059",
    "BOSS RUSH \u4E2D\u306F RETRY \u3067\u540C\u3058\u30DC\u30B9\u30FB\u96E3\u6613\u5EA6\u304B\u3089\u3084\u308A\u76F4\u3057",
    "\u753B\u9762\u306E\u5341\u5B57\u30DC\u30BF\u30F3\u3067\u3082\u79FB\u52D5\u3067\u304D\u307E\u3059"
  ],
  ranking: [
    "Tab \u307E\u305F\u306F \u2190 \u2192\uFF08A / D\uFF09\u3067\u30BF\u30D6\u5207\u66FF",
    "Enter \u307E\u305F\u306F Esc \u3067\u30BF\u30A4\u30C8\u30EB\u3078",
    "\u753B\u9762\u306E\u5341\u5B57\u30DC\u30BF\u30F3\u3067\u3082\u30BF\u30D6\u3092\u5207\u308A\u66FF\u3048\u3089\u308C\u307E\u3059"
  ],
  result: [
    "\u5341\u5B57\uFF08\u2191\u2193 \u307E\u305F\u306F W / S\uFF09\u3067\u9805\u76EE\u9078\u629E",
    "Enter \u3067\u6C7A\u5B9A",
    "\u753B\u9762\u306E\u5341\u5B57\u30DC\u30BF\u30F3\u3067\u3082\u79FB\u52D5\u3067\u304D\u307E\u3059"
  ]
};
function ControlsHelp({
  variant,
  className = ""
}) {
  const lines = LINES[variant];
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      class: `rounded-lg border border-slate-600/80 bg-slate-950/80 px-3 py-2 text-xs text-slate-300 shadow-lg ${className}`,
      "aria-label": "\u64CD\u4F5C\u65B9\u6CD5",
      children: [
        /* @__PURE__ */ jsx("div", { class: "font-semibold text-amber-400/90 mb-1.5 tracking-wide", children: "\u64CD\u4F5C\u65B9\u6CD5" }),
        /* @__PURE__ */ jsx("ul", { class: "list-disc pl-4 space-y-0.5", children: lines.map((t) => /* @__PURE__ */ jsx("li", { children: t }, t)) })
      ]
    }
  );
}

// client/src/ui/DPad.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "preact/jsx-runtime";
function Btn({
  label,
  sub,
  onClick,
  disabled,
  rounded
}) {
  return /* @__PURE__ */ jsxs2(
    "button",
    {
      type: "button",
      disabled,
      onClick: () => !disabled && onClick(),
      class: `flex flex-col items-center justify-center border border-amber-500/60 bg-slate-900/90 text-amber-100 shadow-inner transition hover:bg-slate-800 active:scale-95 disabled:opacity-40 disabled:pointer-events-none ${rounded} min-w-[3rem] min-h-[2.5rem] touch-manipulation select-none`,
      "aria-label": label,
      children: [
        /* @__PURE__ */ jsx2("span", { class: "text-lg leading-none", children: label }),
        sub ? /* @__PURE__ */ jsx2("span", { class: "text-[10px] text-slate-400 mt-0.5", children: sub }) : null
      ]
    }
  );
}
function DPad({ onDirection, disabled, variant = "cross", className = "" }) {
  const v = variant === "vertical";
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      class: `inline-grid gap-1 ${v ? "grid-cols-1" : "grid-cols-3"} place-items-center ${className}`,
      role: "group",
      "aria-label": "\u5341\u5B57\u30AD\u30FC\uFF08\u753B\u9762\u64CD\u4F5C\uFF09",
      children: [
        !v && /* @__PURE__ */ jsx2("div", { class: "col-start-2", children: /* @__PURE__ */ jsx2(Btn, { label: "\u4E0A", sub: "W", onClick: () => onDirection("up"), disabled, rounded: "rounded-lg" }) }),
        v && /* @__PURE__ */ jsx2(Btn, { label: "\u4E0A", sub: "W", onClick: () => onDirection("up"), disabled, rounded: "rounded-lg" }),
        !v && /* @__PURE__ */ jsxs2(Fragment, { children: [
          /* @__PURE__ */ jsx2(Btn, { label: "\u5DE6", sub: "A", onClick: () => onDirection("left"), disabled, rounded: "rounded-lg" }),
          /* @__PURE__ */ jsx2("div", { class: "w-12 h-10 rounded-lg border border-dashed border-slate-600 bg-slate-950/50 flex items-center justify-center text-[10px] text-slate-500", children: "WASD" }),
          /* @__PURE__ */ jsx2(Btn, { label: "\u53F3", sub: "D", onClick: () => onDirection("right"), disabled, rounded: "rounded-lg" })
        ] }),
        /* @__PURE__ */ jsx2("div", { class: v ? "" : "col-start-2", children: /* @__PURE__ */ jsx2(Btn, { label: "\u4E0B", sub: "S", onClick: () => onDirection("down"), disabled, rounded: "rounded-lg" }) })
      ]
    }
  );
}

// client/src/ui/BossRushSelect.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "preact/jsx-runtime";
var DIFFS = [
  { id: "easy", label: "\u30A4\u30FC\u30B8\u30FC\uFF08HP \u5C11\uFF09" },
  { id: "normal", label: "\u30CE\u30FC\u30DE\u30EB" },
  { id: "hard", label: "\u30CF\u30FC\u30C9" },
  { id: "expert", label: "\u30A8\u30AD\u30B9\u30D1\u30FC\u30C8\uFF08HP \u591A\uFF09" }
];
function BossRushSelect({ onStart, onBack }) {
  const [step, setStep] = useState("boss");
  const [bossIdx, setBossIdx] = useState(0);
  const [diffIdx, setDiffIdx] = useState(0);
  const backIdx = BOSS_SKIN_COUNT;
  const move = (d) => {
    if (step === "boss") {
      if (d === "up") setBossIdx((x) => (x - 1 + backIdx + 1) % (backIdx + 1));
      if (d === "down") setBossIdx((x) => (x + 1) % (backIdx + 1));
    } else {
      if (d === "up") setDiffIdx((x) => (x - 1 + DIFFS.length) % DIFFS.length);
      if (d === "down") setDiffIdx((x) => (x + 1) % DIFFS.length);
    }
  };
  useEffect(() => {
    const onKey = (e) => {
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
          onStart(bossIdx + 1, DIFFS[diffIdx].id);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, bossIdx, diffIdx, onBack, onStart, backIdx]);
  return /* @__PURE__ */ jsxs3("div", { class: "min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 pb-8", children: [
    /* @__PURE__ */ jsx3("h2", { class: "text-3xl font-bold text-amber-400 mb-2", children: "BOSS RUSH" }),
    /* @__PURE__ */ jsx3("p", { class: "text-slate-400 mb-8 text-center max-w-md", children: step === "boss" ? "\u5BFE\u6226\u3059\u308B\u30DC\u30B9\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044" : `BOSS ${bossIdx + 1} \u2014 \u96E3\u6613\u5EA6\uFF08HP \u3067\u5909\u5316\uFF09` }),
    step === "boss" ? /* @__PURE__ */ jsxs3("div", { class: "flex flex-col gap-2 w-full max-w-sm mb-8", children: [
      Array.from({ length: BOSS_SKIN_COUNT }, (_, i) => i + 1).map((b) => /* @__PURE__ */ jsxs3(
        "button",
        {
          type: "button",
          onClick: () => {
            setBossIdx(b - 1);
            setStep("difficulty");
          },
          class: `rounded-xl border px-5 py-3 text-left font-mono ${b - 1 === bossIdx ? "border-amber-400 bg-amber-500/10 text-amber-100" : "border-slate-600 bg-slate-900/40 text-slate-300"}`,
          children: [
            "BOSS ",
            b
          ]
        },
        b
      )),
      /* @__PURE__ */ jsx3(
        "button",
        {
          type: "button",
          onClick: onBack,
          class: `rounded-xl border px-5 py-3 text-left font-mono ${bossIdx === backIdx ? "border-amber-400 bg-amber-500/10 text-amber-100" : "border-slate-600 bg-slate-900/40 text-slate-300"}`,
          children: "\u2190 TITLE"
        }
      )
    ] }) : /* @__PURE__ */ jsxs3("div", { class: "flex flex-col gap-2 w-full max-w-sm mb-8", children: [
      DIFFS.map((d, idx) => /* @__PURE__ */ jsx3(
        "button",
        {
          type: "button",
          onClick: () => onStart(bossIdx + 1, d.id),
          class: `rounded-xl border px-5 py-3 text-left font-mono ${idx === diffIdx ? "border-amber-400 bg-amber-500/10 text-amber-100" : "border-slate-600 bg-slate-900/40 text-slate-300"}`,
          children: d.label
        },
        d.id
      )),
      /* @__PURE__ */ jsx3(
        "button",
        {
          type: "button",
          onClick: () => setStep("boss"),
          class: "rounded-xl border border-slate-600 bg-slate-900/40 px-5 py-3 text-left font-mono text-slate-300",
          children: "\u2190 \u30DC\u30B9\u9078\u629E\u3078"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs3("div", { class: "flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center", children: [
      /* @__PURE__ */ jsx3(ControlsHelp, { variant: "stage", className: "max-w-md w-full sm:flex-1" }),
      /* @__PURE__ */ jsxs3("div", { class: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsx3("span", { class: "text-[10px] uppercase tracking-widest text-slate-500", children: "\u5341\u5B57\u64CD\u4F5C" }),
        /* @__PURE__ */ jsx3(DPad, { variant: "vertical", onDirection: move })
      ] })
    ] })
  ] });
}

// client/src/ui/Game.tsx
import { useCallback, useEffect as useEffect3, useRef as useRef2, useState as useState2 } from "preact/hooks";

// client/src/game/upgrades.ts
var UPGRADE_DEFS = {
  speed_aim: {
    id: "speed_aim",
    name: "\u30B9\u30D4\u30FC\u30C9\u30A2\u30C3\u30D7",
    icon: "\u26A1",
    description: "\u7167\u6E96\u306E\u79FB\u52D5\u901F\u5EA6 +20%",
    maxStacks: 5
  },
  rapid_fire: {
    id: "rapid_fire",
    name: "\u30E9\u30D4\u30C3\u30C9\u30D5\u30A1\u30A4\u30A2",
    icon: "\u{1F525}",
    description: "\u5F3E\u306E\u30AF\u30FC\u30EB\u30C0\u30A6\u30F3 -0.04 \u79D2\uFF08\u6700\u5C0F 0.10 \u79D2\uFF09",
    maxStacks: 5
  },
  double_shot: {
    id: "double_shot",
    name: "\u30C0\u30D6\u30EB\u30B7\u30E7\u30C3\u30C8",
    icon: "\u27152",
    description: "\u767A\u5C04\u3054\u3068\u306B\u5F3E\u3092 2 \u767A\u540C\u6642\uFF08\u7E26\u306B\u308F\u305A\u304B\u306B\u305A\u308C\u3066\uFF09",
    maxStacks: 1
  },
  triple_shot: {
    id: "triple_shot",
    name: "\u30C8\u30EA\u30D7\u30EB\u30B7\u30E7\u30C3\u30C8",
    icon: "\u27153",
    description: "\u767A\u5C04\u3054\u3068\u306B\u5F3E\u3092 3 \u767A\u540C\u6642\uFF08\u6247\u72B6\uFF09",
    maxStacks: 1
  },
  pierce: {
    id: "pierce",
    name: "\u8CAB\u901A\u5F3E",
    icon: "\u27A4",
    description: "\u5F3E\u304C\u6575\u3092\u8CAB\u901A\uFF08\u6700\u5927 3 \u4F53\u307E\u3067\uFF09",
    maxStacks: 2
  },
  pierce_burst: {
    id: "pierce_burst",
    name: "\u30D4\u30A2\u30B9\u30D0\u30FC\u30B9\u30C8",
    icon: "\u2726",
    description: "\u6483\u7834\u6642\u306B\u5468\u56F2\u3078\u62E1\u6563\u5F3E\uFF08\u8CAB\u901A\u306A\u3057\uFF09",
    maxStacks: 2
  },
  fortress_shield: {
    id: "fortress_shield",
    name: "\u30E9\u30A4\u30D5\u56DE\u5FA9",
    icon: "\u{1F6E1}",
    description: "\u81EA\u6A5F HP \u3092 +1 \u56DE\u5FA9\uFF08\u6700\u5927 HP \u3092\u8D85\u3048\u306A\u3044\uFF09",
    maxStacks: 999
  },
  sniper: {
    id: "sniper",
    name: "\u30B9\u30CA\u30A4\u30D1\u30FC\u30E2\u30FC\u30C9",
    icon: "\u{1F3AF}",
    description: "\u5F3E\u306E\u98DB\u7FD4\u901F\u5EA6 +50%",
    maxStacks: 3
  },
  magnet: {
    id: "magnet",
    name: "\u30DE\u30B0\u30CD\u30C3\u30C8",
    icon: "\u{1F9F2}",
    description: "\u5F3E\u304C\u6700\u8FD1\u508D\u306E\u6575\u3078\u8EFD\u304F\u30DB\u30FC\u30DF\u30F3\u30B0",
    maxStacks: 2
  },
  score_boost: {
    id: "score_boost",
    name: "\u30B9\u30B3\u30A2\u30D6\u30FC\u30B9\u30C8",
    icon: "\u2605",
    description: "\u30AD\u30EB\u30B9\u30B3\u30A2 +20%",
    maxStacks: 5
  }
};
function emptyUpgradeStacks() {
  return {
    speed_aim: 0,
    rapid_fire: 0,
    double_shot: 0,
    triple_shot: 0,
    pierce: 0,
    pierce_burst: 0,
    fortress_shield: 0,
    sniper: 0,
    magnet: 0,
    score_boost: 0
  };
}
function stackOf(stacks, id) {
  return stacks[id] ?? 0;
}
function availableUpgradeIds(stacks) {
  const out = [];
  for (const id of Object.keys(UPGRADE_DEFS)) {
    const def = UPGRADE_DEFS[id];
    if (stackOf(stacks, id) >= def.maxStacks) continue;
    if (id === "double_shot" && stackOf(stacks, "triple_shot") > 0) continue;
    if (id === "triple_shot" && stackOf(stacks, "double_shot") === 0) continue;
    out.push(id);
  }
  return out;
}
function pickUpgradeChoices(stacks, rng = Math.random) {
  const pool = [...availableUpgradeIds(stacks)];
  const picks = [];
  while (picks.length < 3 && pool.length > 0) {
    const i = Math.floor(rng() * pool.length);
    picks.push(pool[i]);
    pool.splice(i, 1);
  }
  while (picks.length < 3) picks.push("fortress_shield");
  return picks;
}
function applyUpgradePick(stacks, id) {
  const next = { ...stacks };
  const def = UPGRADE_DEFS[id];
  const cur = stackOf(next, id);
  if (cur < def.maxStacks) next[id] = cur + 1;
  if (id === "triple_shot" && next.triple_shot > 0) next.double_shot = 0;
  return next;
}
function fireCooldownSec(stacks) {
  return Math.max(0.1, 0.3 - 0.04 * Math.min(5, stackOf(stacks, "rapid_fire")));
}
function pierceExtraTargets(stacks) {
  return Math.min(2, stackOf(stacks, "pierce"));
}
function bulletSpeedMultiplier(stacks) {
  return 1 + 0.5 * Math.min(3, stackOf(stacks, "sniper"));
}
function magnetStrength(stacks) {
  return 0.12 * Math.min(2, stackOf(stacks, "magnet"));
}
function scoreBoostMultiplier(stacks) {
  return 1 + 0.2 * Math.min(5, stackOf(stacks, "score_boost"));
}
function burstBulletCount(stacks) {
  return 8 + 2 * Math.min(2, stackOf(stacks, "pierce_burst"));
}
function listActiveUpgrades(stacks) {
  const out = [];
  for (const id of Object.keys(UPGRADE_DEFS)) {
    const c = stackOf(stacks, id);
    if (c > 0) out.push({ name: UPGRADE_DEFS[id].name, count: c });
  }
  return out;
}

// client/src/game/bullet.ts
var _bid = 0;
function nextBulletId() {
  _bid += 1;
  return `b-${_bid}`;
}
var MONSTER_HALF_W = 26;
var MONSTER_HALF_H = 30;
function monsterHitbox(m, playHeight) {
  const scale = m.isBoss ? 1.78 : m.isElite ? 1.38 : 1;
  return {
    cx: m.x,
    cy: monsterWorldY(m, playHeight),
    hw: MONSTER_HALF_W * scale,
    hh: MONSTER_HALF_H * scale
  };
}
function inHitbox(bx, by, cx, cy, hw, hh) {
  return Math.abs(bx - cx) <= hw && Math.abs(by - cy) <= hh;
}
function nearestMonster(bx, by, monsters, playHeight, excludeIds) {
  let best = null;
  let bestD = 1e9;
  for (const m of monsters) {
    if (excludeIds.has(m.id)) continue;
    const { cx, cy } = monsterHitbox(m, playHeight);
    const d = (bx - cx) ** 2 + (by - cy) ** 2;
    if (d < bestD) {
      bestD = d;
      best = m;
    }
  }
  return best;
}
function stepBulletHoming(b, dt, monsters, playHeight) {
  if (b.homing <= 0 || b.burstChild || monsters.length === 0) return b;
  const target = nearestMonster(b.x, b.y, monsters, playHeight, /* @__PURE__ */ new Set());
  if (!target) return b;
  const { cx, cy } = monsterHitbox(target, playHeight);
  const dx = cx - b.x;
  const dy = cy - b.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = dx / len;
  const ny = dy / len;
  const turn = b.homing * 4.5 * dt;
  let vx = b.vx + nx * turn * 420;
  let vy = b.vy + ny * turn * 420;
  const sp = Math.hypot(vx, vy) || 1;
  const base = 520 * b.speedMul;
  const scale = base / sp;
  vx *= scale;
  vy *= scale;
  return { ...b, vx, vy };
}
function advanceBullet(b, dt) {
  return { ...b, x: b.x + b.vx * dt, y: b.y + b.vy * dt };
}
function tryBulletHits(b, monsters, playHeight, excludeIds) {
  for (const m of monsters) {
    if (excludeIds.has(m.id)) continue;
    if (b.hitMonsterIds.includes(m.id)) continue;
    const box = monsterHitbox(m, playHeight);
    if (inHitbox(b.x, b.y, box.cx, box.cy, box.hw, box.hh)) {
      if (b.burstChild || b.pierceRemaining <= 0) {
        return { monsterId: m.id, newBullet: null };
      }
      return {
        monsterId: m.id,
        newBullet: {
          ...b,
          pierceRemaining: b.pierceRemaining - 1,
          hitMonsterIds: [...b.hitMonsterIds, m.id]
        }
      };
    }
  }
  return null;
}
function bulletOutOfField(b, playWidth, playHeight) {
  return b.x > playWidth + 40 || b.x < -40 || b.y < -40 || b.y > playHeight + 40;
}
function spawnPlayerVolley(cx, cy, stacks) {
  const speedMul = bulletSpeedMultiplier(stacks);
  const baseV = 520 * speedMul;
  const pierceR = pierceExtraTargets(stacks);
  const homing = magnetStrength(stacks);
  const triple = (stacks.triple_shot ?? 0) > 0;
  const double = (stacks.double_shot ?? 0) > 0;
  const mk = (vx, vy, yoff = 0) => ({
    id: nextBulletId(),
    x: cx,
    y: cy + yoff,
    vx,
    vy,
    pierceRemaining: pierceR,
    burstChild: false,
    homing,
    speedMul,
    hitMonsterIds: []
  });
  if (triple) {
    const angles = [-0.26, 0, 0.26];
    return angles.map((a) => mk(Math.cos(a) * baseV, Math.sin(a) * baseV));
  }
  if (double) {
    return [mk(baseV, 0, -7), mk(baseV, 0, 7)];
  }
  return [mk(baseV, 0)];
}
function spawnBurstRing(cx, cy, count, speedMul) {
  const base = 380 * speedMul;
  const out = [];
  for (let i = 0; i < count; i++) {
    const a = Math.PI * 2 * i / count;
    out.push({
      id: nextBulletId(),
      x: cx,
      y: cy,
      vx: Math.cos(a) * base,
      vy: Math.sin(a) * base,
      pierceRemaining: 0,
      burstChild: true,
      homing: 0,
      speedMul,
      hitMonsterIds: []
    });
  }
  return out;
}

// client/src/game/enemy_bullet.ts
var _eb = 0;
function nextEnemyBulletId() {
  _eb += 1;
  return `eb-${_eb}`;
}
function boss1BurgerSpawnIntervalSec(hpRatio) {
  const r = Math.max(0.06, Math.min(1, hpRatio));
  return Math.max(0.42, 0.48 + r * 1.85);
}
var BOSS_BURGER_EIGHT_WAY_INTERVAL_SEC = 1.15;
var BOSS_BURGER_CHILD_BULLET_SPEED = 210;
function spawnEnemyBulletTowardPlayer(m, playHeight, playerX, playerY, speed) {
  const mx = m.x;
  const my = monsterWorldY(m, playHeight);
  const dx = playerX - mx;
  const dy = playerY - my;
  const len = Math.hypot(dx, dy) || 1;
  return {
    id: nextEnemyBulletId(),
    x: mx,
    y: my,
    vx: dx / len * speed,
    vy: dy / len * speed,
    variant: "normal"
  };
}
function spawnBossBurgerBullet(mx, my, playerX, playerY, speed, initialBurstDelay) {
  const dx = playerX - mx;
  const dy = playerY - my;
  const len = Math.hypot(dx, dy) || 1;
  return {
    id: nextEnemyBulletId(),
    x: mx,
    y: my,
    vx: dx / len * speed,
    vy: dy / len * speed,
    variant: "boss_burger",
    burstTimer: initialBurstDelay
  };
}
function spawnEightWayEnemyBurst(x, y, speed) {
  const out = [];
  for (let i = 0; i < 8; i++) {
    const a = Math.PI / 4 * i;
    out.push({
      id: nextEnemyBulletId(),
      x,
      y,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed,
      variant: "normal"
    });
  }
  return out;
}
function advanceEnemyBullet(b, dt) {
  return { ...b, x: b.x + b.vx * dt, y: b.y + b.vy * dt };
}
function enemyBulletOutOfField(b, playWidth, playHeight = PLAYFIELD_HEIGHT) {
  return b.x < -40 || b.x > playWidth + 40 || b.y < -40 || b.y > playHeight + 40;
}
function enemyBulletHitsPlayer(b, playerX, playerY) {
  const dx = b.x - playerX;
  const dy = b.y - playerY;
  const br = b.variant === "boss_burger" ? BOSS_BURGER_BULLET_HIT_RADIUS : ENEMY_BULLET_HIT_RADIUS;
  const r = PLAYER_HIT_RADIUS + br;
  return dx * dx + dy * dy <= r * r;
}

// client/src/game/scoring.ts
function killScore(maxHp, comboBefore, isBoss, isElite, isRare, scoreBoostMul) {
  const base = 100 + maxHp * 30;
  let mult = 1 + Math.min(5, comboBefore) * 0.12;
  if (isBoss) mult *= 3;
  if (isElite) mult *= 2;
  if (isRare) mult *= 2.25;
  mult *= scoreBoostMul;
  return Math.floor(base * mult);
}

// client/src/game/stage_backgrounds.ts
var STAGE_BACKGROUND_URLS = [
  "/assets/backgrounds/01.png",
  "/assets/backgrounds/02.png",
  "/assets/backgrounds/03.png",
  "/assets/backgrounds/04.png",
  "/assets/backgrounds/05.png",
  "/assets/backgrounds/06.png",
  "/assets/backgrounds/07.png",
  "/assets/backgrounds/08.png",
  "/assets/backgrounds/09.png",
  "/assets/backgrounds/10.png",
  "/assets/backgrounds/11.png",
  "/assets/backgrounds/12.png"
];
function pickStageBackground(excludeIndex) {
  const n = STAGE_BACKGROUND_URLS.length;
  if (n === 0) return { index: 0, url: "" };
  if (n === 1) return { index: 0, url: STAGE_BACKGROUND_URLS[0] };
  const candidates = excludeIndex === null ? [...STAGE_BACKGROUND_URLS.keys()] : [...STAGE_BACKGROUND_URLS.keys()].filter((i) => i !== excludeIndex);
  const idx = candidates[Math.floor(Math.random() * candidates.length)];
  return { index: idx, url: STAGE_BACKGROUND_URLS[idx] };
}

// client/src/game/engine.ts
var ANNOUNCE_SEC = 3;
var WAVE_CLEAR_SEC = 0.95;
var GAME_OVER_BANNER_SEC = 0.95;
var INTERWAVE_SEC = 0.08;
var INITIAL_HP = 3;
var BOSS_RUSH_PLAYER_HP = 7;
var UPGRADE_FLASH_SEC = 0.55;
var PLAYER_IFRAMES_AFTER_HIT = 1.85;
var PLAYER_MARGIN_X = 36;
var PLAYER_MARGIN_Y = 36;
function maxConcurrent(W) {
  return Math.min(8, Math.ceil(W / 5) + 1);
}
function spawnIntervalSec(W) {
  return Math.max(0.8, 3 - W * 0.05);
}
function monstersInWave(W) {
  return Math.min(40, 6 + W * 2);
}
function enemyBulletSpeed(difficultyW) {
  return Math.min(420, 260 + difficultyW * 5);
}
var BOSS1_AIMED_BULLET_MULT = 0.88;
var BOSS1_BURGER_SPEED_MULT = 0.28;
var GameEngine = class {
  mode;
  stage;
  startTime = Date.now();
  phase = "announce";
  phaseTimer = ANNOUNCE_SEC;
  announceLabel = "";
  stageBackgroundUrl = STAGE_BACKGROUND_URLS[0] ?? "";
  playerHp = INITIAL_HP;
  maxHp = INITIAL_HP;
  waveInStage = 1;
  waveGlobal = 0;
  monsters = [];
  bullets = [];
  enemyBullets = [];
  spawnTimer = 0;
  pendingSpawns = 0;
  bossSpawnedThisWave = false;
  crosshairX = 400;
  crosshairY = 270;
  score = 0;
  combo = 0;
  shotsFired = 0;
  hitsLanded = 0;
  paused = false;
  killTimes = [];
  totalWavesCleared = 0;
  lastWaveWasPerfect = false;
  upgradeStacks = emptyUpgradeStacks();
  upgradeChoices = [];
  upgradeFlashSec = 0;
  pendingEndingAfterBreak = false;
  tookPlayerDamageThisWave = false;
  /** 残り無敵時間（秒） */
  playerIframesSec = 0;
  defeatFxQueue = [];
  needBoss = false;
  lastFireAtMs = -1e9;
  lastStageBgIndex = null;
  bossRushBossId = null;
  bossRushDifficulty = null;
  pullDefeatFxMonsters() {
    const out = this.defeatFxQueue;
    this.defeatFxQueue = [];
    return out;
  }
  constructor(mode, startStage, bossRush) {
    this.mode = mode;
    const bg0 = pickStageBackground(null);
    this.lastStageBgIndex = bg0.index;
    this.stageBackgroundUrl = bg0.url;
    if (mode === "boss_rush") {
      if (!bossRush) throw new Error("boss_rush requires bossRush options");
      this.bossRushBossId = bossRush.bossId;
      this.bossRushDifficulty = bossRush.difficulty;
      this.stage = bossRush.bossId;
      this.waveInStage = 1;
      this.waveGlobal = 1;
      this.playerHp = BOSS_RUSH_PLAYER_HP;
      this.maxHp = BOSS_RUSH_PLAYER_HP;
      this.beginAnnounceBossRush();
    } else {
      this.stage = mode === "story" ? startStage : 1;
      this.beginAnnounce();
    }
  }
  /**
   * 敵の強さ・数・スポーン等に使うウェーブ指標。
   * - エンドレス: `waveGlobal`（通算）
   * - ストーリー: `waveInStage + (stage-1)×STORY_STAGE_DIFFICULTY_OFFSET`
   */
  difficultyW() {
    if (this.mode === "boss_rush") return 24;
    if (this.mode === "endless") return this.waveGlobal;
    return this.waveInStage + (this.stage - 1) * STORY_STAGE_DIFFICULTY_OFFSET;
  }
  beginAnnounceBossRush() {
    const d = this.bossRushDifficulty;
    const label = { easy: "EASY", normal: "NORMAL", hard: "HARD", expert: "EXPERT" }[d];
    this.announceLabel = `BOSS RUSH \u2014 BOSS ${this.bossRushBossId} \xB7 ${label}`;
    this.phase = "announce";
    this.phaseTimer = ANNOUNCE_SEC;
    this.tookPlayerDamageThisWave = false;
    this.needBoss = false;
    this.bossSpawnedThisWave = true;
  }
  pickSpawnLane() {
    const counts = [0, 0, 0, 0];
    for (const m of this.monsters) counts[m.lane] += 1;
    let min = counts[0];
    const candidates = [];
    for (let i = 0; i < 4; i++) {
      if (counts[i] < min) {
        min = counts[i];
        candidates.length = 0;
        candidates.push(i);
      } else if (counts[i] === min) {
        candidates.push(i);
      }
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  }
  snapshot(_playWidth, _playHeight) {
    return {
      phase: this.phase,
      phaseTimer: this.phaseTimer,
      announceLabel: this.announceLabel,
      playerHp: this.playerHp,
      maxHp: this.maxHp,
      waveInStage: this.waveInStage,
      waveGlobal: this.waveGlobal,
      stage: this.stage,
      mode: this.mode,
      bossRushBossId: this.bossRushBossId ?? void 0,
      bossRushDifficulty: this.bossRushDifficulty ?? void 0,
      monsters: this.monsters.map((m) => ({ ...m })),
      bullets: this.bullets.map((b) => ({ ...b })),
      enemyBullets: this.enemyBullets.map((b) => ({ ...b })),
      crosshairX: this.crosshairX,
      crosshairY: this.crosshairY,
      score: this.score,
      combo: this.combo,
      shotsFired: this.shotsFired,
      hitsLanded: this.hitsLanded,
      paused: this.paused,
      reachedWave: this.waveGlobal,
      killTimes: [...this.killTimes],
      pendingSpawns: this.pendingSpawns,
      totalWavesCleared: this.totalWavesCleared,
      lastWaveWasPerfect: this.lastWaveWasPerfect,
      upgradeChoices: [...this.upgradeChoices],
      upgradeStacks: { ...this.upgradeStacks },
      upgradeFlashSec: this.upgradeFlashSec,
      pendingEndingAfterBreak: this.pendingEndingAfterBreak,
      stageBackgroundUrl: this.stageBackgroundUrl,
      playerIframesSec: this.playerIframesSec
    };
  }
  togglePause() {
    if (this.phase !== "playing" && this.phase !== "paused") return;
    if (this.phase === "paused") {
      this.phase = "playing";
      this.paused = false;
    } else {
      this.phase = "paused";
      this.paused = true;
    }
  }
  beginAnnounce() {
    this.waveGlobal += 1;
    if (this.mode === "story") {
      this.needBoss = this.waveInStage > 0 && this.waveInStage % 5 === 0;
    } else {
      this.needBoss = this.waveGlobal > 0 && this.waveGlobal % 5 === 0;
    }
    this.bossSpawnedThisWave = false;
    if (this.mode === "story") {
      this.announceLabel = `WAVE ${this.waveInStage} / 10 \u2014 STAGE ${this.stage}`;
    } else {
      this.announceLabel = `WAVE ${this.waveGlobal}`;
    }
    this.phase = "announce";
    this.phaseTimer = ANNOUNCE_SEC;
    this.tookPlayerDamageThisWave = false;
  }
  startPlaying() {
    const playWidth = PLAYFIELD_WIDTH;
    const playHeight = PLAYFIELD_HEIGHT;
    this.phase = "playing";
    this.paused = false;
    this.bullets = [];
    this.enemyBullets = [];
    this.crosshairX = PLAYER_MARGIN_X + 42;
    this.crosshairY = laneCenterYpx(1, playHeight);
    this.tookPlayerDamageThisWave = false;
    this.playerIframesSec = 0;
    if (this.mode === "boss_rush") {
      this.pendingSpawns = 0;
      this.spawnTimer = 0;
      const m = spawnBossRushMonster(
        playWidth,
        this.bossRushBossId,
        this.bossRushDifficulty
      );
      this.monsters = [m];
      return;
    }
    const W = this.difficultyW();
    this.pendingSpawns = monstersInWave(W);
    this.spawnTimer = 0;
    this.monsters = [];
    this.spawnNext();
  }
  spawnNext() {
    if (this.pendingSpawns <= 0) return;
    const W = this.difficultyW();
    if (this.monsters.length >= maxConcurrent(W)) return;
    const isBoss = this.needBoss && !this.bossSpawnedThisWave;
    const lane = this.pickSpawnLane();
    const bossTen = isBoss ? this.mode === "story" ? this.waveInStage % 10 === 0 : this.waveGlobal % 10 === 0 : false;
    const m = spawnMonster(PLAYFIELD_WIDTH, W, isBoss, lane, bossTen);
    this.monsters.push(m);
    this.pendingSpawns -= 1;
    if (isBoss) this.bossSpawnedThisWave = true;
    this.spawnTimer = spawnIntervalSec(W);
  }
  /** 撃破直後・左外デスポーン直後など、フィールドが空いたら間隔を待たず埋める */
  refillFieldIfEmpty() {
    if (this.phase !== "playing") return;
    const maxC = maxConcurrent(this.difficultyW());
    if (this.pendingSpawns <= 0 || this.monsters.length > 0) return;
    while (this.pendingSpawns > 0 && this.monsters.length < maxC) {
      this.spawnNext();
    }
  }
  tryFire(nowMs) {
    if (this.phase !== "playing" || this.paused) return false;
    const cd = fireCooldownSec(this.upgradeStacks) * 1e3;
    if (nowMs - this.lastFireAtMs < cd) return false;
    this.lastFireAtMs = nowMs;
    const volley = spawnPlayerVolley(this.crosshairX, this.crosshairY, this.upgradeStacks);
    this.bullets.push(...volley);
    this.shotsFired += volley.length;
    return true;
  }
  confirmUpgrade(id) {
    if (this.phase !== "upgrade_select") return;
    this.upgradeStacks = applyUpgradePick(this.upgradeStacks, id);
    if (id === "fortress_shield") {
      this.playerHp = Math.min(this.maxHp, this.playerHp + 1);
    }
    this.upgradeFlashSec = UPGRADE_FLASH_SEC;
    this.phase = "interwave";
    this.phaseTimer = INTERWAVE_SEC;
  }
  moveCrosshair(deltaX, deltaY) {
    if (this.phase !== "playing" || this.paused) return;
    const mul = 1 + 0.2 * Math.min(5, this.upgradeStacks.speed_aim ?? 0);
    const playWidth = PLAYFIELD_WIDTH;
    const playHeight = PLAYFIELD_HEIGHT;
    const minX = PLAYER_MARGIN_X;
    const maxX = playWidth - PLAYER_MARGIN_X;
    const minY = PLAYER_MARGIN_Y;
    const maxY = playHeight - PLAYER_MARGIN_Y;
    this.crosshairX = Math.max(minX, Math.min(maxX, this.crosshairX + deltaX * mul));
    this.crosshairY = Math.max(minY, Math.min(maxY, this.crosshairY + deltaY * mul));
  }
  applyKill(m, now, playHeight) {
    const boost = scoreBoostMultiplier(this.upgradeStacks);
    this.score += killScore(m.maxHp, this.combo, m.isBoss, m.isElite, m.isRare, boost);
    this.combo += 1;
    this.killTimes.push(now);
    this.killTimes = this.killTimes.filter((t) => now - t <= 3e3);
    const cx = m.x;
    const cy = monsterWorldY(m, playHeight);
    const n = burstBulletCount(this.upgradeStacks);
    if ((this.upgradeStacks.pierce_burst ?? 0) > 0 && n > 0) {
      this.bullets.push(
        ...spawnBurstRing(cx, cy, n, bulletSpeedMultiplier(this.upgradeStacks))
      );
    }
    this.defeatFxQueue.push({ ...m });
    this.monsters = this.monsters.filter((x) => x.id !== m.id);
  }
  damageMonsterById(id, now, playHeight) {
    const m = this.monsters.find((x) => x.id === id);
    if (!m) return;
    if (m.hp <= 1) {
      this.applyKill(m, now, playHeight);
    } else {
      this.monsters = this.monsters.map((x) => x.id === id ? { ...x, hp: x.hp - 1 } : x);
    }
  }
  processPlayerBullets(dt, now, playWidth, playHeight) {
    const next = [];
    for (const b0 of this.bullets) {
      let b = stepBulletHoming(b0, dt, this.monsters, playHeight);
      b = advanceBullet(b, dt);
      if (bulletOutOfField(b, playWidth, playHeight)) continue;
      let cur = b;
      let absorbed = false;
      const struck = /* @__PURE__ */ new Set();
      while (!absorbed) {
        const hit = tryBulletHits(cur, this.monsters, playHeight, struck);
        if (!hit) {
          next.push(cur);
          break;
        }
        this.hitsLanded += 1;
        struck.add(hit.monsterId);
        this.damageMonsterById(hit.monsterId, now, playHeight);
        if (hit.newBullet) {
          cur = hit.newBullet;
        } else {
          absorbed = true;
        }
      }
    }
    this.bullets = next;
  }
  processEnemyBullets(dt, playWidth, playHeight) {
    const queue = [...this.enemyBullets];
    const survived = [];
    let qi = 0;
    while (qi < queue.length) {
      const raw = queue[qi++];
      let eb = advanceEnemyBullet(raw, dt);
      if (enemyBulletOutOfField(eb, playWidth, playHeight)) continue;
      if (eb.variant === "boss_burger") {
        const burstIv = BOSS_BURGER_EIGHT_WAY_INTERVAL_SEC;
        let bt = (eb.burstTimer ?? burstIv) - dt;
        const childSpd = BOSS_BURGER_CHILD_BULLET_SPEED;
        while (bt <= 0) {
          queue.push(...spawnEightWayEnemyBurst(eb.x, eb.y, childSpd));
          bt += burstIv;
        }
        eb = { ...eb, burstTimer: bt };
      }
      if (enemyBulletHitsPlayer(eb, this.crosshairX, this.crosshairY)) {
        if (this.playerIframesSec > 0) {
          continue;
        }
        this.playerHp -= 1;
        this.tookPlayerDamageThisWave = true;
        this.combo = 0;
        this.playerIframesSec = PLAYER_IFRAMES_AFTER_HIT;
        if (this.playerHp <= 0) {
          this.bullets = [];
          this.enemyBullets = [];
          this.playerIframesSec = 0;
          this.announceLabel = "GAME OVER";
          this.phase = "game_over_banner";
          this.phaseTimer = GAME_OVER_BANNER_SEC;
          return;
        }
        continue;
      }
      survived.push(eb);
    }
    this.enemyBullets = survived;
  }
  stepMonsters(dt, playWidth, playHeight) {
    const px = this.crosshairX;
    const py = this.crosshairY;
    const bSpeed = enemyBulletSpeed(this.difficultyW());
    const updated = [];
    const BOSS_RISE_SPEED = 95;
    const BOSS_MARGIN = 80;
    const bossPatrolLo = BOSS_MARGIN;
    const bossPatrolHi = playHeight - BOSS_MARGIN;
    for (const m of this.monsters) {
      let timer = m.enemyFireTimer - dt;
      if (timer <= 0) {
        const aimSpd = m.isBoss && m.skinIndex === 1 ? bSpeed * BOSS1_AIMED_BULLET_MULT : bSpeed;
        this.enemyBullets.push(
          spawnEnemyBulletTowardPlayer(m, playHeight, px, py, aimSpd)
        );
        timer = m.enemyFireInterval + Math.random() * 0.35;
      }
      if (m.isBoss) {
        const anchorX = playWidth * 0.82;
        const enterY = playHeight * 0.38;
        let phase = m.bossPhase ?? "rising";
        let y = m.bossY ?? playHeight + 100;
        let vy = m.bossVy ?? 90;
        let burgerCd = m.boss1BurgerCd;
        if (m.skinIndex === 1) {
          const ratio = m.maxHp > 0 ? m.hp / m.maxHp : 0.3;
          const spawnIv = boss1BurgerSpawnIntervalSec(ratio);
          burgerCd = (burgerCd ?? spawnIv * 0.4) - dt;
          const slow = bSpeed * BOSS1_BURGER_SPEED_MULT;
          while (burgerCd <= 0) {
            this.enemyBullets.push(
              spawnBossBurgerBullet(
                anchorX,
                y,
                px,
                py,
                slow,
                BOSS_BURGER_EIGHT_WAY_INTERVAL_SEC
              )
            );
            burgerCd += spawnIv;
          }
        }
        if (phase === "rising") {
          y -= BOSS_RISE_SPEED * dt;
          if (y <= enterY) {
            y = enterY;
            phase = "patrol";
            vy = Math.abs(vy) > 0 ? Math.abs(vy) : 90;
          }
        } else {
          y += vy * dt;
          if (y < bossPatrolLo) {
            y = bossPatrolLo;
            vy = Math.abs(vy);
          } else if (y > bossPatrolHi) {
            y = bossPatrolHi;
            vy = -Math.abs(vy);
          }
        }
        const baseBoss = {
          ...m,
          x: anchorX,
          speed: 0,
          bossY: y,
          bossVy: vy,
          bossPhase: phase,
          enemyFireTimer: timer
        };
        updated.push(
          m.skinIndex === 1 ? { ...baseBoss, boss1BurgerCd: burgerCd } : baseBoss
        );
        continue;
      }
      const nx = m.x - m.speed * dt;
      if (nx < MONSTER_DESPAWN_X) continue;
      updated.push({ ...m, x: nx, enemyFireTimer: timer });
    }
    this.monsters = updated;
  }
  onWaveCleared() {
    if (this.mode === "boss_rush") {
      this.bullets = [];
      this.enemyBullets = [];
      const bg2 = pickStageBackground(this.lastStageBgIndex);
      this.lastStageBgIndex = bg2.index;
      this.stageBackgroundUrl = bg2.url;
      this.announceLabel = "BOSS \u6483\u7834\uFF01";
      this.phase = "wave_clear";
      this.phaseTimer = WAVE_CLEAR_SEC;
      return;
    }
    this.totalWavesCleared += 1;
    this.lastWaveWasPerfect = !this.tookPlayerDamageThisWave;
    this.bullets = [];
    this.enemyBullets = [];
    const bg = pickStageBackground(this.lastStageBgIndex);
    this.lastStageBgIndex = bg.index;
    this.stageBackgroundUrl = bg.url;
    if (this.mode === "story" && this.waveInStage === 10) {
      this.pendingEndingAfterBreak = true;
    } else {
      this.waveInStage += 1;
    }
    this.upgradeChoices = pickUpgradeChoices(this.upgradeStacks);
    this.announceLabel = "WAVE \u30AF\u30EA\u30A2";
    this.phase = "wave_clear";
    this.phaseTimer = WAVE_CLEAR_SEC;
  }
  step(dt, now, playWidth, playHeight) {
    const pw = PLAYFIELD_WIDTH;
    const ph = PLAYFIELD_HEIGHT;
    if (this.phase === "gameover" || this.phase === "ending") return;
    if (this.upgradeFlashSec > 0) {
      this.upgradeFlashSec = Math.max(0, this.upgradeFlashSec - dt);
    }
    if (this.phase === "announce") {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) this.startPlaying();
      return;
    }
    if (this.phase === "wave_clear") {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) {
        if (this.mode === "boss_rush") {
          this.phase = "ending";
        } else {
          this.phase = "upgrade_select";
          this.phaseTimer = 0;
        }
      }
      return;
    }
    if (this.phase === "upgrade_select") {
      return;
    }
    if (this.phase === "interwave") {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) {
        if (this.pendingEndingAfterBreak) {
          this.phase = "ending";
          return;
        }
        this.beginAnnounce();
      }
      return;
    }
    if (this.phase === "paused") return;
    if (this.phase === "game_over_banner") {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) {
        this.phase = "gameover";
      }
      return;
    }
    if (this.phase !== "playing") return;
    if (this.playerIframesSec > 0) {
      this.playerIframesSec = Math.max(0, this.playerIframesSec - dt);
    }
    this.processPlayerBullets(dt, now, pw, ph);
    if (this.phase !== "playing") return;
    this.refillFieldIfEmpty();
    this.stepMonsters(dt, pw, ph);
    this.refillFieldIfEmpty();
    this.processEnemyBullets(dt, pw, ph);
    if (this.phase !== "playing") return;
    const maxC = maxConcurrent(this.difficultyW());
    this.spawnTimer -= dt;
    while (this.pendingSpawns > 0 && this.spawnTimer <= 0 && this.monsters.length < maxC) {
      this.spawnNext();
    }
    if (this.pendingSpawns <= 0 && this.monsters.length === 0) {
      this.onWaveCleared();
    }
  }
};

// client/src/ui/DefeatEffect.tsx
import { useEffect as useEffect2, useRef } from "preact/hooks";
import gsap from "gsap";
import { jsx as jsx4, jsxs as jsxs4 } from "preact/jsx-runtime";
var SHARD_COUNT = 14;
function DefeatEffect({ fxKey, x, y, src, onRemove }) {
  const rootRef = useRef(null);
  const imgRef = useRef(null);
  const ringRef = useRef(null);
  const ring2Ref = useRef(null);
  const flashRef = useRef(null);
  const onRemoveRef = useRef(onRemove);
  onRemoveRef.current = onRemove;
  useEffect2(() => {
    const root = rootRef.current;
    const img = imgRef.current;
    const ring = ringRef.current;
    const ring2 = ring2Ref.current;
    const flash = flashRef.current;
    if (!root || !img || !ring || !ring2 || !flash) return;
    let tl = null;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onRemoveRef.current(fxKey);
    };
    const raf = requestAnimationFrame(() => {
      const shards = root.querySelectorAll(".defeat-shard");
      gsap.set([img, ring, ring2, flash], { transformOrigin: "50% 50%" });
      gsap.set(img, { scale: 1, opacity: 1, rotation: 0, clearProps: "filter" });
      gsap.set(ring, { scale: 0.4, opacity: 0.95 });
      gsap.set(ring2, { scale: 0.55, opacity: 0.75 });
      gsap.set(flash, { scale: 0.2, opacity: 0 });
      gsap.set(shards, { x: 0, y: 0, opacity: 0, rotation: 0, scaleX: 1, scaleY: 1 });
      tl = gsap.timeline({
        onComplete: finish,
        defaults: { overwrite: "auto" }
      });
      tl.to(flash, { opacity: 0.85, scale: 1.35, duration: 0.07, ease: "power2.out" }).to(flash, { opacity: 0, scale: 2.2, duration: 0.22, ease: "power2.in" }, "<0.02").to(
        ring2,
        {
          scale: 4.2,
          opacity: 0,
          rotation: 55,
          duration: 0.62,
          ease: "power2.out"
        },
        0
      ).to(
        ring,
        {
          scale: 3.4,
          opacity: 0,
          rotation: -35,
          duration: 0.58,
          ease: "power2.out"
        },
        0.02
      ).to(
        img,
        { scale: 1.18, filter: "brightness(1.35) saturate(1.2)", duration: 0.1, ease: "power2.out" },
        0
      ).to(
        img,
        {
          scale: 0.02,
          opacity: 0,
          rotation: 48,
          filter: "brightness(0.4) blur(1px)",
          duration: 0.52,
          ease: "power3.in"
        },
        0.08
      );
      shards.forEach((sh, i) => {
        const base = i / SHARD_COUNT * Math.PI * 2 + (Math.random() - 0.5) * 0.55;
        const dist = 52 + Math.random() * 56;
        const mid = 18 + Math.random() * 14;
        tl.to(
          sh,
          {
            opacity: 1,
            duration: 0.05,
            x: Math.cos(base) * mid,
            y: Math.sin(base) * mid,
            rotation: (Math.random() - 0.5) * 40,
            ease: "power1.out"
          },
          0.02 + i * 8e-3
        ).to(
          sh,
          {
            x: Math.cos(base) * dist,
            y: Math.sin(base) * dist,
            opacity: 0,
            rotation: `+=${140 + Math.random() * 100}`,
            scaleX: 0.35,
            scaleY: 1.4,
            duration: 0.48,
            ease: "power2.out"
          },
          0.07 + i * 6e-3
        );
      });
    });
    return () => {
      cancelAnimationFrame(raf);
      if (tl) tl.kill();
      if (!done) finish();
    };
  }, [fxKey]);
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      ref: rootRef,
      class: "absolute pointer-events-none flex items-center justify-center z-[60]",
      style: { left: x, top: y, transform: "translate(-50%, -50%)" },
      "aria-hidden": true,
      children: [
        Array.from({ length: SHARD_COUNT }, (_, i) => /* @__PURE__ */ jsx4(
          "div",
          {
            class: "defeat-shard absolute left-1/2 top-1/2 w-1.5 h-3.5 rounded-sm -translate-x-1/2 -translate-y-1/2 shadow-[0_0_6px_rgba(251,191,36,0.9)]",
            style: {
              background: i % 3 === 0 ? "linear-gradient(180deg,#fff7ed,#fbbf24)" : i % 3 === 1 ? "linear-gradient(180deg,#fce7f3,#f472b6)" : "linear-gradient(180deg,#e0f2fe,#38bdf8)"
            }
          },
          i
        )),
        /* @__PURE__ */ jsx4(
          "div",
          {
            ref: ring2Ref,
            class: "absolute rounded-full border-2 border-fuchsia-400/90 w-[4.5rem] h-[4.5rem] shadow-[0_0_28px_rgba(232,121,249,0.75)]"
          }
        ),
        /* @__PURE__ */ jsx4(
          "div",
          {
            ref: ringRef,
            class: "absolute rounded-full border-2 border-amber-300 w-16 h-16 shadow-[0_0_24px_rgba(251,191,36,0.95)]"
          }
        ),
        /* @__PURE__ */ jsx4(
          "div",
          {
            ref: flashRef,
            class: "absolute rounded-full w-24 h-24 bg-white mix-blend-screen pointer-events-none"
          }
        ),
        /* @__PURE__ */ jsx4(
          "img",
          {
            ref: imgRef,
            src,
            alt: "",
            class: "relative h-12 w-auto max-w-[80px] object-contain drop-shadow-lg z-[1]",
            draggable: false
          }
        )
      ]
    }
  );
}

// client/src/ui/HpBar.tsx
import { jsx as jsx5, jsxs as jsxs5 } from "preact/jsx-runtime";
function MonsterHpBar({
  hp,
  maxHp,
  variant,
  showNumeric
}) {
  const pct = maxHp > 0 ? Math.max(0, Math.min(100, hp / maxHp * 100)) : 0;
  const fill = variant === "boss" ? "bg-red-500" : variant === "elite" ? "bg-orange-500" : "bg-emerald-500";
  const barMaxW = variant === "boss" ? "max-w-[5.75rem]" : "max-w-[4.5rem]";
  return /* @__PURE__ */ jsxs5("div", { class: `flex flex-col items-center gap-0.5 ${variant === "boss" ? "min-w-[4.25rem]" : "min-w-[3.5rem]"}`, children: [
    /* @__PURE__ */ jsx5("div", { class: `w-full ${barMaxW} h-1.5 bg-slate-900 rounded overflow-hidden border border-slate-700/90`, children: /* @__PURE__ */ jsx5("div", { class: `h-full ${fill} transition-[width] duration-75`, style: { width: `${pct}%` } }) }),
    showNumeric ? /* @__PURE__ */ jsxs5("span", { class: "text-[9px] font-mono text-red-200 tabular-nums", children: [
      hp,
      "/",
      maxHp
    ] }) : null
  ] });
}

// client/src/ui/UpgradeSelect.tsx
import { jsx as jsx6, jsxs as jsxs6 } from "preact/jsx-runtime";
function UpgradeSelectOverlay({
  waveGlobal,
  choices,
  stacks,
  selectedIdx,
  onSelectIndex,
  onConfirm
}) {
  return /* @__PURE__ */ jsxs6("div", { class: "absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/75 px-3 py-6", children: [
    /* @__PURE__ */ jsx6("h3", { class: "text-xl sm:text-2xl font-black text-cyan-300 mb-2 text-center drop-shadow-lg", children: "\u5F37\u5316\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044" }),
    /* @__PURE__ */ jsxs6("p", { class: "text-slate-400 text-sm font-mono mb-6", children: [
      "WAVE ",
      waveGlobal,
      " \u30AF\u30EA\u30A2"
    ] }),
    /* @__PURE__ */ jsx6("div", { class: "flex flex-row flex-nowrap gap-3 justify-center max-w-5xl w-full overflow-x-auto pb-1", children: choices.map((id, idx) => {
      const def = UPGRADE_DEFS[id];
      const st = stacks[id] ?? 0;
      const sel = idx === selectedIdx;
      return /* @__PURE__ */ jsxs6(
        "button",
        {
          type: "button",
          onClick: () => {
            onSelectIndex(idx);
            onConfirm(id);
          },
          onMouseEnter: () => onSelectIndex(idx),
          class: `flex flex-col items-stretch rounded-xl border-2 p-3 sm:p-4 w-[min(100%,11rem)] sm:w-44 text-left transition-colors ${sel ? "border-cyan-400 bg-cyan-950/50 shadow-[0_0_20px_rgba(34,211,238,0.25)]" : "border-slate-600 bg-slate-900/80 hover:border-slate-500"}`,
          children: [
            /* @__PURE__ */ jsx6("div", { class: "text-3xl mb-1 text-center", children: def.icon }),
            /* @__PURE__ */ jsx6("div", { class: "font-bold text-amber-200 text-sm leading-tight mb-1", children: def.name }),
            /* @__PURE__ */ jsx6("p", { class: "text-[11px] text-slate-400 leading-snug flex-1", children: def.description }),
            /* @__PURE__ */ jsxs6("div", { class: "mt-2 text-[10px] font-mono text-slate-500", children: [
              "\u6240\u6301: \xD7",
              st,
              def.maxStacks < 900 ? ` / \u6700\u5927 ${def.maxStacks}` : ""
            ] })
          ]
        },
        `${id}-${idx}`
      );
    }) }),
    /* @__PURE__ */ jsx6("p", { class: "mt-6 text-xs text-slate-500 text-center", children: "\u2190\u2192 / A D \u3067\u9078\u629E \xB7 Enter \u307E\u305F\u306F\u30AB\u30FC\u30C9\u3092\u30AF\u30EA\u30C3\u30AF\u3067\u6C7A\u5B9A" })
  ] });
}

// client/src/ui/Game.tsx
import { Fragment as Fragment2, jsx as jsx7, jsxs as jsxs7 } from "preact/jsx-runtime";
function bossRushResultExtra(s) {
  if (s.mode !== "boss_rush") return {};
  if (s.bossRushBossId == null || !s.bossRushDifficulty) return {};
  return {
    bossRush: { bossId: s.bossRushBossId, difficulty: s.bossRushDifficulty }
  };
}
function clearTimeSec(mode, startMs) {
  const sec = (Date.now() - startMs) / 1e3;
  return mode === "boss_rush" ? Math.round(sec * 10) / 10 : Math.floor(sec);
}
function pauseMenuItems(mode) {
  if (mode === "boss_rush") {
    return [
      { id: "resume", label: "RESUME" },
      { id: "retry", label: "RETRY" },
      { id: "quit", label: "QUIT TO TITLE" }
    ];
  }
  return [
    { id: "resume", label: "RESUME" },
    { id: "quit", label: "QUIT TO TITLE" }
  ];
}
function laneTopPct(lane) {
  return 18 + lane * 16;
}
var PW = PLAYFIELD_WIDTH;
var PH = PLAYFIELD_HEIGHT;
function GamePlay({ mode, startStage, bossRush, onFinish, onBossRushRetry }) {
  const fieldRef = useRef2(null);
  const engineRef = useRef2(null);
  if (!engineRef.current) {
    engineRef.current = new GameEngine(mode, startStage, bossRush);
  }
  const [, setTick] = useState2(0);
  const [pauseIdx, setPauseIdx] = useState2(0);
  const pauseIdxRef = useRef2(0);
  pauseIdxRef.current = pauseIdx;
  const [upgradeIdx, setUpgradeIdx] = useState2(0);
  const upgradeIdxRef = useRef2(0);
  upgradeIdxRef.current = upgradeIdx;
  const finishedRef = useRef2(false);
  const prevPhaseRef = useRef2(engineRef.current.snapshot(PW, PH).phase);
  const unlockedRef = useRef2(/* @__PURE__ */ new Set());
  const keysHeld = useRef2(/* @__PURE__ */ new Set());
  const [deathFx, setDeathFx] = useState2([]);
  const deathKey = useRef2(0);
  const removeDeathFx = useCallback((k) => {
    setDeathFx((xs) => xs.filter((z) => z.key !== k));
  }, []);
  const safeUnlock = (id) => {
    if (unlockedRef.current.has(id)) return;
    unlockedRef.current.add(id);
    void unlockAchievement(id).catch(() => {
    });
  };
  const pushDeathFx = (m, playHeight) => {
    deathKey.current += 1;
    const fx = {
      id: m.id,
      x: m.x,
      yPx: monsterWorldY(m, playHeight),
      src: monsterImagePath(m),
      key: `d-${deathKey.current}`
    };
    safeUnlock("first_blood");
    setDeathFx((xs) => [...xs, fx]);
  };
  useEffect3(() => {
    const down = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keysHeld.current.add(k);
    };
    const up = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keysHeld.current.delete(k);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);
  useEffect3(() => {
    const eng = engineRef.current;
    let raf = 0;
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1e3);
      last = now;
      for (const m of eng.pullDefeatFxMonsters()) {
        pushDeathFx(m, PH);
      }
      const beforeSnap = eng.snapshot(PW, PH);
      if (beforeSnap.phase === "playing" && !beforeSnap.paused) {
        const v = 300 * dt;
        if (keysHeld.current.has("a") || keysHeld.current.has("arrowleft")) {
          eng.moveCrosshair(-v, 0);
        }
        if (keysHeld.current.has("d") || keysHeld.current.has("arrowright")) {
          eng.moveCrosshair(v, 0);
        }
        if (keysHeld.current.has("w") || keysHeld.current.has("arrowup")) {
          eng.moveCrosshair(0, -v);
        }
        if (keysHeld.current.has("s") || keysHeld.current.has("arrowdown")) {
          eng.moveCrosshair(0, v);
        }
        const enterHeld = keysHeld.current.has("Enter") || keysHeld.current.has("NumpadEnter");
        if (enterHeld) eng.tryFire(now);
      }
      eng.step(dt, now, PW, PH);
      for (const m of eng.pullDefeatFxMonsters()) {
        pushDeathFx(m, PH);
      }
      const s2 = eng.snapshot(PW, PH);
      if (s2.killTimes.length >= 5) safeUnlock("rapid_fire");
      const pp = prevPhaseRef.current;
      if (pp === "playing" && (s2.phase === "upgrade_select" || s2.phase === "wave_clear") && s2.lastWaveWasPerfect) {
        safeUnlock("perfect_wave");
      }
      if (s2.mode === "endless" && s2.waveGlobal >= 50) {
        safeUnlock("wave_survivor_50");
      }
      if (s2.phase === "ending") {
        safeUnlock("fortress_guardian");
      }
      if (s2.phase === "upgrade_select" && pp !== "upgrade_select") {
        setUpgradeIdx(0);
        upgradeIdxRef.current = 0;
      }
      prevPhaseRef.current = s2.phase;
      if ((s2.phase === "gameover" || s2.phase === "ending") && !finishedRef.current) {
        finishedRef.current = true;
        const hitRate = s2.shotsFired > 0 ? s2.hitsLanded / s2.shotsFired : 0;
        const timeSec = clearTimeSec(s2.mode, eng.startTime);
        onFinish({
          outcome: s2.phase === "ending" ? "ending" : "gameover",
          score: s2.score,
          waveReached: s2.waveGlobal,
          hitRate,
          shotsFired: s2.shotsFired,
          hitsLanded: s2.hitsLanded,
          timeSec,
          mode: s2.mode,
          stage: s2.stage,
          ...bossRushResultExtra(s2)
        });
      }
      setTick((x) => x + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [onFinish]);
  const s = engineRef.current.snapshot(PW, PH);
  const activeUps = listActiveUpgrades(s.upgradeStacks);
  useEffect3(() => {
    const eng = engineRef.current;
    const onKey = (e) => {
      const snap = eng.snapshot(PW, PH);
      if (finishedRef.current) return;
      if (snap.phase === "upgrade_select") {
        const ch = snap.upgradeChoices;
        if (ch.length === 0) return;
        const code = e.code;
        if (code === "ArrowUp" || code === "ArrowDown" || code === "KeyW" || code === "KeyS") {
          e.preventDefault();
          return;
        }
        if (code === "ArrowLeft" || code === "KeyA") {
          e.preventDefault();
          setUpgradeIdx((x) => {
            const n = (x - 1 + ch.length) % ch.length;
            upgradeIdxRef.current = n;
            return n;
          });
          return;
        }
        if (code === "ArrowRight" || code === "KeyD") {
          e.preventDefault();
          setUpgradeIdx((x) => {
            const n = (x + 1) % ch.length;
            upgradeIdxRef.current = n;
            return n;
          });
          return;
        }
        if (e.key === "Enter") {
          e.preventDefault();
          const id = ch[upgradeIdxRef.current];
          if (id) eng.confirmUpgrade(id);
        }
        return;
      }
      if (snap.phase === "paused") {
        const pauseMenu = pauseMenuItems(snap.mode);
        const plen = pauseMenu.length;
        if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
          e.preventDefault();
          setPauseIdx((x) => (x - 1 + plen) % plen);
        }
        if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
          e.preventDefault();
          setPauseIdx((x) => (x + 1) % plen);
        }
        if (e.key === "Enter") {
          e.preventDefault();
          const pi = pauseIdxRef.current;
          const item = pauseMenu[pi];
          if (item?.id === "resume") {
            eng.togglePause();
            setPauseIdx(0);
          } else if (item?.id === "retry" && snap.mode === "boss_rush") {
            onBossRushRetry?.();
          } else if (item?.id === "quit") {
            finishedRef.current = true;
            const hitRate = snap.shotsFired > 0 ? snap.hitsLanded / snap.shotsFired : 0;
            onFinish({
              outcome: "quit",
              score: snap.score,
              waveReached: snap.waveGlobal,
              hitRate,
              shotsFired: snap.shotsFired,
              hitsLanded: snap.hitsLanded,
              timeSec: clearTimeSec(snap.mode, eng.startTime),
              mode: snap.mode,
              stage: snap.stage,
              ...bossRushResultExtra(snap)
            });
          }
        }
        if (e.key === "Escape") {
          e.preventDefault();
          eng.togglePause();
          setPauseIdx(0);
        }
        return;
      }
      if (snap.phase === "playing" && !snap.paused) {
        if (e.key === "Escape") {
          e.preventDefault();
          eng.togglePause();
          setPauseIdx(0);
          return;
        }
        if (e.key === "Enter" || e.key === "NumpadEnter") {
          e.preventDefault();
        }
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onFinish, onBossRushRetry]);
  const hearts = Array.from({ length: s.maxHp }, (_, i) => i < s.playerHp);
  const hpBarVariant = (m) => {
    if (m.isBoss) return "boss";
    if (m.isElite) return "elite";
    return "normal";
  };
  const confirmUpgradeFromUi = (id) => {
    engineRef.current.confirmUpgrade(id);
  };
  return /* @__PURE__ */ jsxs7("div", { class: "min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs7("header", { class: "w-full max-w-[1008px] flex flex-wrap items-center gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900/80 shrink-0 box-border", children: [
      /* @__PURE__ */ jsx7("div", { class: "flex gap-1", "aria-label": "\u81EA\u6A5FHP", children: hearts.map((ok, i) => /* @__PURE__ */ jsx7("span", { class: ok ? "text-red-500 text-xl" : "text-slate-700 text-xl", children: "\u2665" }, i)) }),
      /* @__PURE__ */ jsxs7("div", { class: "font-mono text-amber-300 text-sm flex-1", children: [
        s.mode === "boss_rush" && s.bossRushBossId != null && s.bossRushDifficulty ? /* @__PURE__ */ jsxs7(Fragment2, { children: [
          "BOSS RUSH \xB7 BOSS ",
          s.bossRushBossId,
          " \xB7 ",
          s.bossRushDifficulty.toUpperCase()
        ] }) : s.mode === "story" ? `STAGE ${s.stage} \xB7 WAVE ${s.waveInStage}/10` : `WAVE ${s.waveGlobal}`,
        s.mode === "endless" ? /* @__PURE__ */ jsxs7("span", { class: "text-slate-500 ml-2", children: [
          "\xB7 W#",
          s.waveGlobal
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxs7("div", { class: "font-mono text-emerald-400", children: [
        "SCORE ",
        s.score
      ] }),
      /* @__PURE__ */ jsxs7("div", { class: "font-mono text-slate-500 text-xs", children: [
        "COMBO \xD7",
        s.combo
      ] }),
      /* @__PURE__ */ jsx7("div", { class: "text-slate-500 text-xs hidden sm:block", children: "[Esc] \u30DD\u30FC\u30BA" })
    ] }),
    /* @__PURE__ */ jsx7("div", { class: "w-full max-w-[1008px] flex flex-col items-center px-2 box-border", children: /* @__PURE__ */ jsxs7(
      "div",
      {
        ref: fieldRef,
        class: "relative shrink-0 bg-slate-950 overflow-hidden rounded-lg border border-slate-800",
        style: { width: `${PW}px`, height: `${PH}px` },
        children: [
          /* @__PURE__ */ jsxs7("div", { class: "absolute inset-0 z-0 overflow-hidden rounded-lg pointer-events-none", children: [
            /* @__PURE__ */ jsx7(
              "img",
              {
                src: s.stageBackgroundUrl,
                alt: "",
                class: "absolute inset-0 h-full w-full object-cover",
                draggable: false
              },
              s.stageBackgroundUrl
            ),
            /* @__PURE__ */ jsx7(
              "div",
              {
                class: "absolute inset-0 bg-slate-950/40",
                "aria-hidden": true
              }
            )
          ] }),
          s.phase === "announce" ? /* @__PURE__ */ jsx7("div", { class: "absolute inset-0 flex items-center justify-center pointer-events-none z-20", children: /* @__PURE__ */ jsxs7("div", { class: "text-center px-2", children: [
            /* @__PURE__ */ jsx7("div", { class: "text-2xl sm:text-3xl font-black text-amber-400 drop-shadow-lg leading-tight", children: s.announceLabel }),
            /* @__PURE__ */ jsx7("div", { class: "text-slate-400 mt-2 font-mono", children: Math.ceil(s.phaseTimer) })
          ] }) }) : null,
          s.phase === "wave_clear" ? /* @__PURE__ */ jsx7("div", { class: "absolute inset-0 flex items-center justify-center pointer-events-none z-[55] bg-black/50", children: /* @__PURE__ */ jsx7("div", { class: "text-center px-2", children: /* @__PURE__ */ jsx7("div", { class: "text-4xl sm:text-5xl font-black tracking-wide text-white drop-shadow-[0_0_20px_rgba(16,185,129,0.9)] [text-shadow:_0_2px_8px_rgb(0_0_0_/_0.85)]", children: s.announceLabel }) }) }) : null,
          s.phase === "game_over_banner" ? /* @__PURE__ */ jsx7("div", { class: "absolute inset-0 flex items-center justify-center pointer-events-none z-[55] bg-black/50", children: /* @__PURE__ */ jsx7("div", { class: "text-center px-2", children: /* @__PURE__ */ jsx7("div", { class: "text-4xl sm:text-5xl font-black tracking-wide text-rose-200 drop-shadow-[0_0_20px_rgba(244,63,94,0.85)] [text-shadow:_0_2px_8px_rgb(0_0_0_/_0.85)]", children: s.announceLabel }) }) }) : null,
          s.phase === "upgrade_select" && s.mode !== "boss_rush" ? /* @__PURE__ */ jsx7(
            UpgradeSelectOverlay,
            {
              waveGlobal: s.waveGlobal,
              choices: s.upgradeChoices,
              stacks: s.upgradeStacks,
              selectedIdx: upgradeIdx,
              onSelectIndex: (i) => {
                setUpgradeIdx(i);
                upgradeIdxRef.current = i;
              },
              onConfirm: confirmUpgradeFromUi
            }
          ) : null,
          s.phase === "interwave" && s.upgradeFlashSec > 0 ? /* @__PURE__ */ jsx7("div", { class: "absolute inset-0 flex items-center justify-center pointer-events-none z-20", children: /* @__PURE__ */ jsx7("div", { class: "text-base font-bold text-cyan-300 drop-shadow-lg", children: "\u5F37\u5316\u3092\u53D6\u5F97\uFF01" }) }) : null,
          s.phase === "paused" ? /* @__PURE__ */ jsxs7("div", { class: "absolute inset-0 bg-black/75 flex flex-col items-center justify-center z-30 gap-4 px-3 py-4 overflow-y-auto", children: [
            /* @__PURE__ */ jsx7("div", { class: "text-3xl font-black tracking-widest text-amber-200", children: "PAUSED" }),
            /* @__PURE__ */ jsxs7("div", { class: "w-full max-w-sm rounded-lg border border-slate-600 bg-slate-950/90 px-3 py-2 text-left", children: [
              /* @__PURE__ */ jsx7("div", { class: "text-[10px] uppercase tracking-widest text-slate-500 mb-1", children: "\u53D6\u5F97\u4E2D\u306E\u5F37\u5316" }),
              activeUps.length === 0 ? /* @__PURE__ */ jsx7("p", { class: "text-xs text-slate-500", children: "\u307E\u3060\u3042\u308A\u307E\u305B\u3093" }) : /* @__PURE__ */ jsx7("ul", { class: "text-xs text-slate-300 space-y-0.5 max-h-32 overflow-y-auto", children: activeUps.map((u) => /* @__PURE__ */ jsxs7("li", { children: [
                u.name,
                " \xD7",
                u.count
              ] }, u.name)) })
            ] }),
            /* @__PURE__ */ jsx7("div", { class: "flex flex-col gap-2 w-full max-w-xs", children: pauseMenuItems(s.mode).map((it, idx) => /* @__PURE__ */ jsxs7(
              "button",
              {
                type: "button",
                onClick: () => {
                  if (it.id === "resume") {
                    engineRef.current.togglePause();
                    setPauseIdx(0);
                  } else if (it.id === "retry") {
                    onBossRushRetry?.();
                  } else {
                    finishedRef.current = true;
                    const eng = engineRef.current;
                    const sh2 = eng.snapshot(PW, PH);
                    const hitRate = sh2.shotsFired > 0 ? sh2.hitsLanded / sh2.shotsFired : 0;
                    onFinish({
                      outcome: "quit",
                      score: sh2.score,
                      waveReached: sh2.waveGlobal,
                      hitRate,
                      shotsFired: sh2.shotsFired,
                      hitsLanded: sh2.hitsLanded,
                      timeSec: clearTimeSec(sh2.mode, eng.startTime),
                      mode: sh2.mode,
                      stage: sh2.stage,
                      ...bossRushResultExtra(sh2)
                    });
                  }
                },
                class: `rounded-xl border px-4 py-3 font-mono text-left w-full ${idx === pauseIdx ? "border-amber-400 bg-amber-500/15 text-amber-100" : "border-slate-600 bg-slate-900/60"}`,
                children: [
                  "[",
                  it.label,
                  "]"
                ]
              },
              it.id
            )) }),
            /* @__PURE__ */ jsxs7("div", { class: "flex flex-col sm:flex-row items-start gap-4 w-full max-w-lg justify-center", children: [
              /* @__PURE__ */ jsx7(ControlsHelp, { variant: "game_pause", className: "flex-1 max-w-md" }),
              /* @__PURE__ */ jsxs7("div", { class: "flex flex-col items-center gap-2 mx-auto sm:mx-0", children: [
                /* @__PURE__ */ jsx7("span", { class: "text-[10px] uppercase tracking-widest text-slate-500", children: "\u5341\u5B57\u64CD\u4F5C" }),
                /* @__PURE__ */ jsx7(
                  DPad,
                  {
                    variant: "vertical",
                    onDirection: (d) => {
                      const plen = pauseMenuItems(s.mode).length;
                      if (d === "up") setPauseIdx((x) => (x - 1 + plen) % plen);
                      if (d === "down") setPauseIdx((x) => (x + 1) % plen);
                    }
                  }
                )
              ] })
            ] })
          ] }) : null,
          deathFx.map((fx) => /* @__PURE__ */ jsx7(
            DefeatEffect,
            {
              fxKey: fx.key,
              x: fx.x,
              y: fx.yPx,
              src: fx.src,
              onRemove: removeDeathFx
            },
            fx.key
          )),
          s.bullets.map((b) => /* @__PURE__ */ jsx7(
            "div",
            {
              class: "absolute z-[15] w-2.5 h-2.5 rounded-full bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.85)] pointer-events-none",
              style: {
                left: `${b.x}px`,
                top: `${b.y}px`,
                transform: "translate(-50%, -50%)"
              },
              "aria-hidden": true
            },
            b.id
          )),
          s.enemyBullets.map((eb) => {
            const big = eb.variant === "boss_burger";
            const speed = Math.hypot(eb.vx, eb.vy);
            const trailLen = Math.min(big ? 96 : 76, (big ? 28 : 18) + speed * 0.16);
            const trailW = big ? 10 : 6;
            const trailAngDeg = Math.atan2(-eb.vy, -eb.vx) * 180 / Math.PI;
            const rgb = big ? "250, 204, 21" : "253, 224, 71";
            const imgRotDeg = Math.atan2(eb.vy, eb.vx) * 180 / Math.PI;
            const bossTrailOuter = Math.min(140, trailLen * 1.48 + speed * 0.12);
            const bossTrailMid = Math.min(118, trailLen * 1.15 + speed * 0.08);
            const sparkT = [0.18, 0.38, 0.58, 0.78];
            return /* @__PURE__ */ jsxs7(
              "div",
              {
                class: "absolute z-[16] pointer-events-none select-none",
                style: {
                  left: `${eb.x}px`,
                  top: `${eb.y}px`,
                  transform: "translate(-50%, -50%)"
                },
                "aria-hidden": true,
                children: [
                  big ? /* @__PURE__ */ jsxs7(Fragment2, { children: [
                    /* @__PURE__ */ jsx7(
                      "div",
                      {
                        class: "absolute rounded-full boss-burger-trail-outer-animate",
                        style: {
                          width: `${bossTrailOuter}px`,
                          height: `${trailW + 16}px`,
                          left: "50%",
                          top: "50%",
                          transform: `translate(0, -50%) rotate(${trailAngDeg}deg)`,
                          transformOrigin: "0 50%",
                          background: "linear-gradient(90deg, rgba(255,255,255,0.35) 0%, rgba(254,243,199,0.5) 12%, rgba(251,191,36,0.35) 38%, rgba(245,158,11,0.12) 65%, rgba(250,204,21,0) 100%)",
                          filter: "blur(6px)",
                          boxShadow: "0 0 22px rgba(250,204,21,0.45)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsx7(
                      "div",
                      {
                        class: "absolute rounded-full boss-burger-trail-mid-animate",
                        style: {
                          width: `${bossTrailMid}px`,
                          height: `${trailW + 8}px`,
                          left: "50%",
                          top: "50%",
                          transform: `translate(0, -50%) rotate(${trailAngDeg}deg)`,
                          transformOrigin: "0 50%",
                          background: "linear-gradient(90deg, rgba(255,251,235,0.9) 0%, rgba(251,146,60,0.65) 22%, rgba(250,204,21,0.55) 48%, rgba(234,179,8,0.2) 78%, rgba(250,204,21,0) 100%)",
                          filter: "blur(2.5px)",
                          boxShadow: "0 0 14px rgba(251,146,60,0.55)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsx7(
                      "div",
                      {
                        class: "absolute left-1/2 top-1/2 w-0 h-0",
                        style: { transform: `rotate(${trailAngDeg}deg)` },
                        children: sparkT.map((t, si) => /* @__PURE__ */ jsx7(
                          "div",
                          {
                            class: "absolute rounded-full boss-burger-spark-animate",
                            style: {
                              left: `${bossTrailMid * t}px`,
                              top: `${Math.sin(t * 12.9898 + si) * 5}px`,
                              width: si % 2 === 0 ? 7 : 5,
                              height: si % 2 === 0 ? 7 : 5,
                              background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(254,240,138,0.85) 45%, rgba(250,204,21,0.2) 100%)",
                              boxShadow: "0 0 10px rgba(255,237,160,0.95), 0 0 18px rgba(251,191,36,0.65)",
                              animationDelay: `${si * 0.13}s`
                            }
                          },
                          si
                        ))
                      }
                    )
                  ] }) : null,
                  /* @__PURE__ */ jsx7(
                    "div",
                    {
                      class: `absolute rounded-full opacity-[0.92] ${big ? "boss-burger-trail-core-animate" : ""}`,
                      style: {
                        width: `${trailLen}px`,
                        height: `${trailW}px`,
                        left: "50%",
                        top: "50%",
                        transform: `translate(0, -50%) rotate(${trailAngDeg}deg)`,
                        transformOrigin: "0 50%",
                        background: `linear-gradient(90deg, rgba(254,252,232,0.65) 0%, rgba(${rgb},0.88) 20%, rgba(${rgb},0.5) 48%, rgba(${rgb},0) 100%)`,
                        filter: big ? "blur(1.5px) drop-shadow(0 0 10px rgba(250,204,21,0.85))" : "blur(1px) drop-shadow(0 0 5px rgba(253,224,71,0.55))"
                      }
                    }
                  ),
                  big ? /* @__PURE__ */ jsxs7(Fragment2, { children: [
                    /* @__PURE__ */ jsx7("div", { class: "absolute left-1/2 top-1/2 z-0 flex h-0 w-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center boss-burger-aura-fade-wrap", children: /* @__PURE__ */ jsx7(
                      "div",
                      {
                        class: "boss-burger-aura-ring-outer flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-full border-2 border-amber-200/50 shadow-[0_0_18px_rgba(250,204,21,0.55),inset_0_0_14px_rgba(254,243,199,0.35)]",
                        style: {
                          background: "radial-gradient(circle, rgba(255,251,235,0.15) 0%, rgba(251,191,36,0.08) 55%, transparent 72%)"
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsx7("div", { class: "absolute left-1/2 top-1/2 z-0 flex h-0 w-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center boss-burger-aura-fade-wrap--alt", children: /* @__PURE__ */ jsx7(
                      "div",
                      {
                        class: "boss-burger-aura-ring-inner flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-yellow-200/70 opacity-90 shadow-[0_0_12px_rgba(253,224,71,0.5)]",
                        style: {
                          background: "radial-gradient(circle, rgba(255,255,235,0.12) 0%, transparent 70%)"
                        }
                      }
                    ) })
                  ] }) : null,
                  /* @__PURE__ */ jsx7(
                    "img",
                    {
                      src: big ? "/assets/boss_burger_bullet.png" : "/assets/enemy_bullet.png",
                      alt: "",
                      class: `relative z-[1] object-contain drop-shadow-md ${big ? "w-[52px] h-[52px] boss-burger-sprite-glow-animate" : "w-8 h-8"}`,
                      style: {
                        transform: `rotate(${imgRotDeg}deg) scaleY(-1)`
                      },
                      draggable: false
                    }
                  )
                ]
              },
              eb.id
            );
          }),
          s.phase === "playing" && !s.paused || s.phase === "game_over_banner" ? /* @__PURE__ */ jsx7(
            "div",
            {
              class: "absolute z-[25] pointer-events-none flex flex-col items-center",
              style: {
                left: `${s.crosshairX}px`,
                top: `${s.crosshairY}px`,
                transform: "translate(-50%, -50%)"
              },
              "aria-hidden": true,
              children: /* @__PURE__ */ jsx7(
                "img",
                {
                  src: "/assets/player.png",
                  alt: "",
                  class: `w-[72px] h-[72px] object-contain select-none [filter:drop-shadow(0_4px_12px_rgba(0,0,0,0.5))_drop-shadow(0_0_18px_rgba(244,114,182,0.65))_drop-shadow(0_0_32px_rgba(34,211,238,0.28))] ${s.playerIframesSec > 0 ? "player-iframes-blink" : ""}`,
                  draggable: false
                }
              )
            }
          ) : null,
          s.monsters.map((m) => {
            const sc = monsterDisplayScale(m);
            const bossTall = m.isBoss ? 1.22 : 1;
            const posStyle = m.isBoss ? { top: `${monsterWorldY(m, PH)}px` } : { top: `${laneTopPct(m.lane)}%` };
            return /* @__PURE__ */ jsxs7(
              "div",
              {
                class: "absolute flex flex-col items-center gap-0.5 transition-[left] duration-75 z-10 opacity-95",
                style: { left: `${m.x}px`, ...posStyle, transform: "translate(-50%, -50%)" },
                children: [
                  /* @__PURE__ */ jsx7(
                    MonsterHpBar,
                    {
                      hp: m.hp,
                      maxHp: m.maxHp,
                      variant: hpBarVariant(m),
                      showNumeric: m.isBoss
                    }
                  ),
                  /* @__PURE__ */ jsx7(
                    "img",
                    {
                      src: monsterImagePath(m),
                      alt: "",
                      class: `w-auto object-contain select-none ${m.isRare ? "drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" : ""}`,
                      style: {
                        height: `${(m.isBoss ? 88 : m.isElite ? 52 : 48) * sc * bossTall}px`,
                        maxWidth: `${(m.isBoss ? 132 : m.isElite ? 92 : 88) * sc}px`
                      },
                      draggable: false
                    }
                  ),
                  m.isRare ? /* @__PURE__ */ jsx7("span", { class: "text-[9px] font-bold text-yellow-300", children: "RARE" }) : m.isElite ? /* @__PURE__ */ jsx7("span", { class: "text-[9px] font-bold text-orange-400", children: "ELITE" }) : m.isBoss ? /* @__PURE__ */ jsx7("span", { class: "text-[9px] font-bold text-red-400", children: "BOSS" }) : null
                ]
              },
              m.id
            );
          })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs7("footer", { class: "w-full max-w-[1008px] shrink-0 border-t border-slate-800 bg-slate-900/90 px-4 py-3 space-y-3 box-border", children: [
      /* @__PURE__ */ jsxs7("div", { class: "rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2", children: [
        /* @__PURE__ */ jsx7("div", { class: "text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider mb-1", children: "\u64CD\u4F5C" }),
        /* @__PURE__ */ jsxs7("p", { class: "text-slate-400 text-sm", children: [
          /* @__PURE__ */ jsx7("span", { class: "text-pink-300 font-semibold", children: "\u81EA\u6A5F" }),
          "\u3092 WASD / \u77E2\u5370\u3067\u52D5\u304B\u3057\u3001",
          /* @__PURE__ */ jsx7("span", { class: "text-cyan-300 font-semibold", children: "Enter" }),
          " \u3067\u5F3E\u3092\u767A\u5C04\u3002\u6575\u306E\u5F3E\u306B\u5F53\u305F\u308B\u3068 \u2665 \u304C\u6E1B\u308A\u307E\u3059\u3002"
        ] })
      ] }),
      /* @__PURE__ */ jsxs7("div", { class: "flex flex-col sm:flex-row gap-4 items-start justify-between", children: [
        /* @__PURE__ */ jsx7(ControlsHelp, { variant: "game", className: "flex-1 max-w-lg" }),
        /* @__PURE__ */ jsxs7("p", { class: "text-[10px] text-slate-600 max-w-md sm:max-w-xs leading-relaxed", children: [
          "\u30D7\u30EC\u30A4\u753B\u9762\u306F ",
          PW,
          "\xD7",
          PH,
          "px \u56FA\u5B9A\u3067\u3059\u3002"
        ] })
      ] })
    ] })
  ] });
}

// client/src/ui/Result.tsx
import { useEffect as useEffect4, useState as useState3 } from "preact/hooks";
import { Fragment as Fragment3, jsx as jsx8, jsxs as jsxs8 } from "preact/jsx-runtime";
var MENU = [
  { id: "retry", label: "RETRY" },
  { id: "title", label: "TITLE" }
];
function Result({
  data,
  onRetry,
  onTitle,
  onSubmitEndless,
  onSubmitStory,
  onSubmitBossRush
}) {
  const [i, setI] = useState3(0);
  const [name, setName] = useState3("AAA");
  const [submitted, setSubmitted] = useState3(false);
  const [busy, setBusy] = useState3(false);
  const [err, setErr] = useState3(null);
  const showEndlessSubmit = data.outcome === "gameover" && data.mode === "endless" && onSubmitEndless;
  const showStorySubmit = data.outcome === "ending" && data.mode === "story" && onSubmitStory;
  const showBossSubmit = data.outcome === "ending" && data.mode === "boss_rush" && onSubmitBossRush;
  const move = (d) => {
    if (d === "up") setI((x) => (x - 1 + MENU.length) % MENU.length);
    if (d === "down") setI((x) => (x + 1) % MENU.length);
  };
  useEffect4(() => {
    const onKey = (e) => {
      const t = e.target;
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
      } else if (showBossSubmit && onSubmitBossRush) {
        await onSubmitBossRush(n);
      }
      setSubmitted(true);
    } catch (e) {
      setErr(e.message || "\u9001\u4FE1\u306B\u5931\u6557\u3057\u307E\u3057\u305F");
    } finally {
      setBusy(false);
    }
  };
  const title = data.outcome === "ending" ? data.mode === "boss_rush" ? "BOSS RUSH \u30AF\u30EA\u30A2\uFF01" : data.mode === "story" ? `STAGE ${data.stage} \u30AF\u30EA\u30A2\uFF01` : "STORY \u30AF\u30EA\u30A2\uFF01" : data.outcome === "quit" ? "\u4E2D\u65AD" : "GAME OVER";
  return /* @__PURE__ */ jsxs8("div", { class: "min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 pb-8", children: [
    /* @__PURE__ */ jsx8("h2", { class: "text-4xl font-black text-amber-400 mb-2", children: title }),
    /* @__PURE__ */ jsxs8("div", { class: "text-slate-400 mb-6 font-mono text-sm space-y-1 text-center", children: [
      /* @__PURE__ */ jsxs8("div", { children: [
        "\u5230\u9054\u30A6\u30A7\u30FC\u30D6: ",
        data.waveReached
      ] }),
      /* @__PURE__ */ jsxs8("div", { children: [
        "\u30B9\u30B3\u30A2: ",
        data.score
      ] }),
      /* @__PURE__ */ jsxs8("div", { children: [
        "\u547D\u4E2D\u7387:",
        " ",
        data.shotsFired > 0 ? `${(data.hitRate * 100).toFixed(1)}%` : "\u2014"
      ] }),
      data.mode === "boss_rush" && data.bossRush ? /* @__PURE__ */ jsxs8(Fragment3, { children: [
        /* @__PURE__ */ jsxs8("div", { children: [
          "BOSS ",
          data.bossRush.bossId,
          " \xB7 ",
          data.bossRush.difficulty.toUpperCase()
        ] }),
        /* @__PURE__ */ jsxs8("div", { children: [
          "\u30AF\u30EA\u30A2\u30BF\u30A4\u30E0: ",
          data.timeSec.toFixed(1),
          "s"
        ] })
      ] }) : null,
      data.mode === "story" ? /* @__PURE__ */ jsxs8(Fragment3, { children: [
        /* @__PURE__ */ jsxs8("div", { children: [
          "\u30B9\u30C6\u30FC\u30B8: ",
          data.stage
        ] }),
        /* @__PURE__ */ jsxs8("div", { children: [
          "\u30D7\u30EC\u30A4\u6642\u9593: ",
          data.timeSec,
          "s"
        ] })
      ] }) : null
    ] }),
    (showEndlessSubmit || showStorySubmit || showBossSubmit) && !submitted ? /* @__PURE__ */ jsxs8("div", { class: "mb-6 flex flex-col items-center gap-2 w-full max-w-xs", children: [
      /* @__PURE__ */ jsx8("label", { class: "text-sm text-slate-400", children: "\u540D\u524D\uFF08\u82F1\u5927\u6587\u5B57\u30FB\u6700\u59278\uFF09" }),
      /* @__PURE__ */ jsx8(
        "input",
        {
          class: "w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 font-mono uppercase",
          maxLength: 8,
          value: name,
          onInput: (e) => setName(e.target.value.toUpperCase())
        }
      ),
      /* @__PURE__ */ jsx8(
        "button",
        {
          type: "button",
          disabled: busy,
          onClick: () => void submit(),
          class: "rounded-lg border border-amber-500 px-4 py-2 text-amber-200 hover:bg-amber-500/10 disabled:opacity-50",
          children: "\u30E9\u30F3\u30AD\u30F3\u30B0\u306B\u767B\u9332"
        }
      ),
      err ? /* @__PURE__ */ jsx8("p", { class: "text-red-400 text-sm", children: err }) : null
    ] }) : null,
    submitted ? /* @__PURE__ */ jsx8("p", { class: "text-emerald-400 text-sm mb-4", children: "\u767B\u9332\u3057\u307E\u3057\u305F" }) : null,
    /* @__PURE__ */ jsx8("div", { class: "flex flex-col gap-2 w-full max-w-sm mb-8", children: MENU.map((m, idx) => /* @__PURE__ */ jsxs8(
      "button",
      {
        type: "button",
        onClick: () => m.id === "retry" ? onRetry() : onTitle(),
        class: `rounded-xl border px-5 py-3 text-left font-mono ${idx === i ? "border-amber-400 bg-amber-500/10 text-amber-100" : "border-slate-600 bg-slate-900/40 text-slate-300"}`,
        children: [
          "[",
          m.label,
          "]"
        ]
      },
      m.id
    )) }),
    /* @__PURE__ */ jsxs8("div", { class: "flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center", children: [
      /* @__PURE__ */ jsx8(ControlsHelp, { variant: "result", className: "max-w-md w-full sm:flex-1" }),
      /* @__PURE__ */ jsxs8("div", { class: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsx8("span", { class: "text-[10px] uppercase tracking-widest text-slate-500", children: "\u5341\u5B57\u64CD\u4F5C" }),
        /* @__PURE__ */ jsx8(DPad, { variant: "vertical", onDirection: move })
      ] })
    ] })
  ] });
}

// client/src/ui/Ranking.tsx
import { useEffect as useEffect5, useMemo, useState as useState4 } from "preact/hooks";
import { jsx as jsx9, jsxs as jsxs9 } from "preact/jsx-runtime";
var BOSS_DIFFS = ["easy", "normal", "hard", "expert"];
function RankingView({ onBack }) {
  const [tab, setTab] = useState4("endless");
  const [endless, setEndless] = useState4([]);
  const [story, setStory] = useState4([]);
  const [boss, setBoss] = useState4([]);
  const [bossFilter, setBossFilter] = useState4(1);
  const [diffFilter, setDiffFilter] = useState4("normal");
  const [err, setErr] = useState4(null);
  useEffect5(() => {
    let cancelled = false;
    (async () => {
      try {
        const [e, s, b] = await Promise.all([
          fetchRanking("endless"),
          fetchRanking("story"),
          fetchRanking("boss")
        ]);
        if (!cancelled) {
          setEndless(e);
          setStory(s);
          setBoss(b);
        }
      } catch (e) {
        if (!cancelled) setErr(e.message || "\u8AAD\u307F\u8FBC\u307F\u30A8\u30E9\u30FC");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const bossRows = useMemo(() => {
    return boss.filter((r) => r.boss_id === bossFilter && r.difficulty === diffFilter).sort((a, b) => a.time_sec - b.time_sec);
  }, [boss, bossFilter, diffFilter]);
  const moveTab = (d) => {
    if (tab === "boss") {
      if (d === "left") setBossFilter((x) => Math.max(1, x - 1));
      if (d === "right") setBossFilter((x) => Math.min(BOSS_SKIN_COUNT, x + 1));
      if (d === "up") {
        const i = BOSS_DIFFS.indexOf(diffFilter);
        const n = i <= 0 ? BOSS_DIFFS.length - 1 : i - 1;
        setDiffFilter(BOSS_DIFFS[n]);
      }
      if (d === "down") {
        const i = BOSS_DIFFS.indexOf(diffFilter);
        const n = i < 0 ? 0 : (i + 1) % BOSS_DIFFS.length;
        setDiffFilter(BOSS_DIFFS[n]);
      }
      return;
    }
    if (d === "left" || d === "up") setTab("endless");
    if (d === "right" || d === "down") setTab("story");
  };
  useEffect5(() => {
    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Enter") {
        e.preventDefault();
        onBack();
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        setTab((t) => t === "endless" ? "story" : t === "story" ? "boss" : "endless");
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
  return /* @__PURE__ */ jsxs9("div", { class: "min-h-screen bg-slate-950 text-slate-100 px-4 py-8 flex flex-col items-center", children: [
    /* @__PURE__ */ jsx9("h2", { class: "text-3xl font-bold text-amber-400 mb-6", children: "RANKING" }),
    /* @__PURE__ */ jsxs9("div", { class: "flex flex-wrap gap-2 mb-4 justify-center", children: [
      /* @__PURE__ */ jsx9(
        "button",
        {
          type: "button",
          onClick: () => setTab("endless"),
          class: `rounded-lg px-3 py-2 border text-sm ${tab === "endless" ? "border-amber-400 bg-amber-500/10" : "border-slate-600"}`,
          children: "ENDLESS"
        }
      ),
      /* @__PURE__ */ jsx9(
        "button",
        {
          type: "button",
          onClick: () => setTab("story"),
          class: `rounded-lg px-3 py-2 border text-sm ${tab === "story" ? "border-amber-400 bg-amber-500/10" : "border-slate-600"}`,
          children: "STORY"
        }
      ),
      /* @__PURE__ */ jsx9(
        "button",
        {
          type: "button",
          onClick: () => setTab("boss"),
          class: `rounded-lg px-3 py-2 border text-sm ${tab === "boss" ? "border-amber-400 bg-amber-500/10" : "border-slate-600"}`,
          children: "BOSS RUSH"
        }
      )
    ] }),
    tab === "boss" ? /* @__PURE__ */ jsxs9("div", { class: "flex flex-wrap gap-2 mb-4 justify-center text-xs font-mono text-slate-400", children: [
      /* @__PURE__ */ jsx9("span", { children: "BOSS:" }),
      Array.from({ length: BOSS_SKIN_COUNT }, (_, i) => i + 1).map((b) => /* @__PURE__ */ jsx9(
        "button",
        {
          type: "button",
          onClick: () => setBossFilter(b),
          class: `rounded px-2 py-1 border ${bossFilter === b ? "border-amber-400 text-amber-200" : "border-slate-600"}`,
          children: b
        },
        b
      )),
      /* @__PURE__ */ jsx9("span", { class: "ml-2", children: "\u96E3\u6613\u5EA6:" }),
      BOSS_DIFFS.map((d) => /* @__PURE__ */ jsx9(
        "button",
        {
          type: "button",
          onClick: () => setDiffFilter(d),
          class: `rounded px-2 py-1 border uppercase ${diffFilter === d ? "border-amber-400 text-amber-200" : "border-slate-600"}`,
          children: d
        },
        d
      ))
    ] }) : null,
    err ? /* @__PURE__ */ jsx9("p", { class: "text-red-400 mb-4", children: err }) : null,
    /* @__PURE__ */ jsx9("div", { class: "w-full max-w-2xl overflow-x-auto rounded-lg border border-slate-700 mb-8", children: tab === "endless" ? /* @__PURE__ */ jsxs9("table", { class: "w-full text-sm", children: [
      /* @__PURE__ */ jsx9("thead", { class: "bg-slate-900 text-slate-400", children: /* @__PURE__ */ jsxs9("tr", { children: [
        /* @__PURE__ */ jsx9("th", { class: "p-2 text-left", children: "#" }),
        /* @__PURE__ */ jsx9("th", { class: "p-2 text-left", children: "NAME" }),
        /* @__PURE__ */ jsx9("th", { class: "p-2 text-right", children: "SCORE" }),
        /* @__PURE__ */ jsx9("th", { class: "p-2 text-right", children: "WAVE" }),
        /* @__PURE__ */ jsx9("th", { class: "p-2 text-left", children: "DATE" })
      ] }) }),
      /* @__PURE__ */ jsxs9("tbody", { children: [
        endless.map((r, idx) => /* @__PURE__ */ jsxs9("tr", { class: "border-t border-slate-800", children: [
          /* @__PURE__ */ jsx9("td", { class: "p-2", children: idx + 1 }),
          /* @__PURE__ */ jsx9("td", { class: "p-2 font-mono", children: r.name }),
          /* @__PURE__ */ jsx9("td", { class: "p-2 text-right", children: r.score }),
          /* @__PURE__ */ jsx9("td", { class: "p-2 text-right", children: r.wave }),
          /* @__PURE__ */ jsx9("td", { class: "p-2 text-slate-400", children: r.date })
        ] }, `${r.name}-${idx}`)),
        endless.length === 0 ? /* @__PURE__ */ jsx9("tr", { children: /* @__PURE__ */ jsx9("td", { colSpan: 5, class: "p-4 text-center text-slate-500", children: "\u307E\u3060\u8A18\u9332\u304C\u3042\u308A\u307E\u305B\u3093" }) }) : null
      ] })
    ] }) : tab === "story" ? /* @__PURE__ */ jsxs9("table", { class: "w-full text-sm", children: [
      /* @__PURE__ */ jsx9("thead", { class: "bg-slate-900 text-slate-400", children: /* @__PURE__ */ jsxs9("tr", { children: [
        /* @__PURE__ */ jsx9("th", { class: "p-2 text-left", children: "#" }),
        /* @__PURE__ */ jsx9("th", { class: "p-2 text-left", children: "NAME" }),
        /* @__PURE__ */ jsx9("th", { class: "p-2 text-right", children: "HIT" }),
        /* @__PURE__ */ jsx9("th", { class: "p-2 text-right", children: "TIME" }),
        /* @__PURE__ */ jsx9("th", { class: "p-2 text-left", children: "DATE" })
      ] }) }),
      /* @__PURE__ */ jsxs9("tbody", { children: [
        story.map((r, idx) => /* @__PURE__ */ jsxs9("tr", { class: "border-t border-slate-800", children: [
          /* @__PURE__ */ jsx9("td", { class: "p-2", children: idx + 1 }),
          /* @__PURE__ */ jsx9("td", { class: "p-2 font-mono", children: r.name }),
          /* @__PURE__ */ jsx9("td", { class: "p-2 text-right", children: `${((r.hit_rate ?? r.accuracy ?? 0) * 100).toFixed(1)}%` }),
          /* @__PURE__ */ jsxs9("td", { class: "p-2 text-right", children: [
            r.time_sec,
            "s"
          ] }),
          /* @__PURE__ */ jsx9("td", { class: "p-2 text-slate-400", children: r.cleared_at })
        ] }, `${r.name}-${idx}`)),
        story.length === 0 ? /* @__PURE__ */ jsx9("tr", { children: /* @__PURE__ */ jsx9("td", { colSpan: 5, class: "p-4 text-center text-slate-500", children: "\u307E\u3060\u8A18\u9332\u304C\u3042\u308A\u307E\u305B\u3093" }) }) : null
      ] })
    ] }) : /* @__PURE__ */ jsxs9("table", { class: "w-full text-sm", children: [
      /* @__PURE__ */ jsx9("thead", { class: "bg-slate-900 text-slate-400", children: /* @__PURE__ */ jsxs9("tr", { children: [
        /* @__PURE__ */ jsx9("th", { class: "p-2 text-left", children: "#" }),
        /* @__PURE__ */ jsx9("th", { class: "p-2 text-left", children: "NAME" }),
        /* @__PURE__ */ jsx9("th", { class: "p-2 text-right", children: "TIME" }),
        /* @__PURE__ */ jsx9("th", { class: "p-2 text-left", children: "DATE" })
      ] }) }),
      /* @__PURE__ */ jsxs9("tbody", { children: [
        bossRows.map((r, idx) => /* @__PURE__ */ jsxs9("tr", { class: "border-t border-slate-800", children: [
          /* @__PURE__ */ jsx9("td", { class: "p-2", children: idx + 1 }),
          /* @__PURE__ */ jsx9("td", { class: "p-2 font-mono", children: r.name }),
          /* @__PURE__ */ jsxs9("td", { class: "p-2 text-right", children: [
            r.time_sec,
            "s"
          ] }),
          /* @__PURE__ */ jsx9("td", { class: "p-2 text-slate-400", children: r.date })
        ] }, `${r.name}-${r.time_sec}-${idx}`)),
        bossRows.length === 0 ? /* @__PURE__ */ jsx9("tr", { children: /* @__PURE__ */ jsx9("td", { colSpan: 4, class: "p-4 text-center text-slate-500", children: "\u3053\u306E\u6761\u4EF6\u306E\u8A18\u9332\u306F\u307E\u3060\u3042\u308A\u307E\u305B\u3093" }) }) : null
      ] })
    ] }) }),
    /* @__PURE__ */ jsx9(
      "button",
      {
        type: "button",
        onClick: onBack,
        class: "rounded-xl border border-slate-500 px-6 py-2 mb-8 hover:bg-slate-800",
        children: "TITLE \u3078\u623B\u308B"
      }
    ),
    /* @__PURE__ */ jsx9("p", { class: "text-[10px] text-slate-500 mb-4 text-center max-w-md", children: "[Tab] \u3067\u30BF\u30D6\u5207\u66FF \xB7 BOSS RUSH \u30BF\u30D6\u3067\u306F\u5341\u5B57\u30AD\u30FC\u3067 BOSS / \u96E3\u6613\u5EA6\u30D5\u30A3\u30EB\u30BF" }),
    /* @__PURE__ */ jsxs9("div", { class: "flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center", children: [
      /* @__PURE__ */ jsx9(ControlsHelp, { variant: "ranking", className: "max-w-md w-full sm:flex-1" }),
      /* @__PURE__ */ jsxs9("div", { class: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsx9("span", { class: "text-[10px] uppercase tracking-widest text-slate-500", children: "\u64CD\u4F5C" }),
        /* @__PURE__ */ jsx9(DPad, { variant: "cross", onDirection: moveTab })
      ] })
    ] })
  ] });
}

// client/src/ui/StageSelect.tsx
import { useEffect as useEffect6, useState as useState5 } from "preact/hooks";
import { jsx as jsx10, jsxs as jsxs10 } from "preact/jsx-runtime";
var STAGES = [1, 2, 3, 4, 5];
function StageSelect({ onSelect, onBack }) {
  const [i, setI] = useState5(0);
  const move = (d) => {
    if (d === "up") setI((x) => (x - 1 + STAGES.length + 1) % (STAGES.length + 1));
    if (d === "down") setI((x) => (x + 1) % (STAGES.length + 1));
  };
  useEffect6(() => {
    const onKey = (e) => {
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
  return /* @__PURE__ */ jsxs10("div", { class: "min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 pb-8", children: [
    /* @__PURE__ */ jsx10("h2", { class: "text-3xl font-bold text-amber-400 mb-2", children: "STORY MODE" }),
    /* @__PURE__ */ jsx10("p", { class: "text-slate-400 mb-8", children: "\u30B9\u30C6\u30FC\u30B8\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\uFF08\u540410\u30A6\u30A7\u30FC\u30D6\uFF09" }),
    /* @__PURE__ */ jsxs10("div", { class: "flex flex-col gap-2 w-full max-w-sm mb-8", children: [
      STAGES.map((s, idx) => /* @__PURE__ */ jsxs10(
        "button",
        {
          type: "button",
          onClick: () => onSelect(s),
          class: `rounded-xl border px-5 py-3 text-left font-mono ${idx === i ? "border-amber-400 bg-amber-500/10 text-amber-100" : "border-slate-600 bg-slate-900/40 text-slate-300"}`,
          children: [
            "STAGE ",
            s
          ]
        },
        s
      )),
      /* @__PURE__ */ jsx10(
        "button",
        {
          type: "button",
          onClick: onBack,
          class: `rounded-xl border px-5 py-3 text-left font-mono ${i === STAGES.length ? "border-amber-400 bg-amber-500/10 text-amber-100" : "border-slate-600 bg-slate-900/40 text-slate-300"}`,
          children: "\u2190 TITLE"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs10("div", { class: "flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center", children: [
      /* @__PURE__ */ jsx10(ControlsHelp, { variant: "stage", className: "max-w-md w-full sm:flex-1" }),
      /* @__PURE__ */ jsxs10("div", { class: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsx10("span", { class: "text-[10px] uppercase tracking-widest text-slate-500", children: "\u5341\u5B57\u64CD\u4F5C" }),
        /* @__PURE__ */ jsx10(DPad, { variant: "vertical", onDirection: move })
      ] })
    ] })
  ] });
}

// client/src/ui/Title.tsx
import { useEffect as useEffect7, useState as useState6 } from "preact/hooks";
import { jsx as jsx11, jsxs as jsxs11 } from "preact/jsx-runtime";
var ITEMS = [
  { id: "story", label: "STORY MODE" },
  { id: "endless", label: "ENDLESS MODE" },
  { id: "boss_rush", label: "BOSS RUSH" },
  { id: "ranking", label: "RANKING" }
];
function Title({ onPick }) {
  const [i, setI] = useState6(0);
  const [serverStopped, setServerStopped] = useState6(false);
  const [stopBusy, setStopBusy] = useState6(false);
  const move = (d) => {
    if (d === "up") setI((x) => (x - 1 + ITEMS.length) % ITEMS.length);
    if (d === "down") setI((x) => (x + 1) % ITEMS.length);
  };
  useEffect7(() => {
    const onKey = (e) => {
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
  return /* @__PURE__ */ jsxs11("div", { class: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 pb-8", children: [
    /* @__PURE__ */ jsx11("h1", { class: "text-5xl sm:text-6xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 drop-shadow-[0_0_24px_rgba(251,191,36,0.35)]", children: "WORD SIEGE" }),
    /* @__PURE__ */ jsx11("p", { class: "text-slate-400 mb-10 text-center max-w-md", children: "\u30BF\u30A4\u30D4\u30F3\u30B0\u3067\u6575\u3092\u6483\u9000\u3059\u308B\u30BF\u30EF\u30FC\u30C7\u30A3\u30D5\u30A7\u30F3\u30B9" }),
    /* @__PURE__ */ jsx11("nav", { class: "flex flex-col gap-3 w-full max-w-sm mb-8", "aria-label": "\u30E1\u30A4\u30F3\u30E1\u30CB\u30E5\u30FC", children: ITEMS.map((it, idx) => /* @__PURE__ */ jsxs11(
      "button",
      {
        type: "button",
        onClick: () => onPick(it.id),
        class: `rounded-xl border px-6 py-3 text-left font-mono tracking-wide transition ${idx === i ? "border-amber-400 bg-amber-500/15 text-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.2)]" : "border-slate-600 bg-slate-900/50 text-slate-300 hover:border-slate-500"}`,
        children: [
          "[",
          it.label,
          "]"
        ]
      },
      it.id
    )) }),
    /* @__PURE__ */ jsxs11("div", { class: "flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl justify-center", children: [
      /* @__PURE__ */ jsx11(ControlsHelp, { variant: "title", className: "max-w-md w-full sm:flex-1" }),
      /* @__PURE__ */ jsxs11("div", { class: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsx11("span", { class: "text-[10px] uppercase tracking-widest text-slate-500", children: "\u5341\u5B57\u64CD\u4F5C" }),
        /* @__PURE__ */ jsx11(DPad, { variant: "vertical", onDirection: move })
      ] })
    ] }),
    /* @__PURE__ */ jsxs11("div", { class: "mt-10 w-full max-w-sm text-center border-t border-slate-800 pt-6", children: [
      /* @__PURE__ */ jsx11("p", { class: "text-xs text-slate-500 mb-2", children: "\u30BF\u30D6\u3092\u9589\u3058\u308B\u3068 ping \u304C\u6B62\u307E\u308A\u3001\u3057\u3070\u3089\u304F\u3059\u308B\u3068\u30B5\u30FC\u30D0\u30FC\u304C\u81EA\u52D5\u7D42\u4E86\u3057\u307E\u3059\uFF08\u30B5\u30FC\u30D0\u30FC\u7528\u306E\u9ED2\u3044\u7A93\u3082\u9589\u3058\u307E\u3059\uFF09\u3002\u3059\u3050\u6B62\u3081\u308B\u5834\u5408\u306F\u4E0B\u306E\u30DC\u30BF\u30F3\u3092\u4F7F\u3044\u307E\u3059\u3002" }),
      serverStopped ? /* @__PURE__ */ jsx11("p", { class: "text-sm text-amber-300/90 mb-2", children: "\u30B5\u30FC\u30D0\u30FC\u306F\u505C\u6B62\u3057\u307E\u3057\u305F\u3002\u3053\u306E\u30BF\u30D6\u306F\u624B\u52D5\u3067\u9589\u3058\u3066\u304F\u3060\u3055\u3044\uFF08\u81EA\u52D5\u3067\u306F\u9589\u3058\u3089\u308C\u306A\u3044\u3053\u3068\u304C\u3042\u308A\u307E\u3059\uFF09\u3002" }) : null,
      /* @__PURE__ */ jsx11(
        "button",
        {
          type: "button",
          disabled: stopBusy || serverStopped,
          class: "text-sm text-slate-400 underline underline-offset-2 hover:text-amber-300 disabled:opacity-40 disabled:no-underline",
          onClick: () => {
            void (async () => {
              if (!confirm(
                "Flask \u30B5\u30FC\u30D0\u30FC\u3092\u7D42\u4E86\u3057\u307E\u3059\u304B\uFF1F\n\uFF08\u7D9A\u3051\u308B\u3068\u304D\u306F start.bat \u304B\u3089\u518D\u8D77\u52D5\u3057\u3066\u304F\u3060\u3055\u3044\uFF09"
              )) {
                return;
              }
              setStopBusy(true);
              await requestServerShutdown();
              setStopBusy(false);
              setServerStopped(true);
              window.close();
            })();
          },
          children: stopBusy ? "\u7D42\u4E86\u51E6\u7406\u4E2D\u2026" : "\u30B5\u30FC\u30D0\u30FC\u3092\u7D42\u4E86\u3059\u308B"
        }
      )
    ] })
  ] });
}

// client/src/main.tsx
import { jsx as jsx12 } from "preact/jsx-runtime";
function App() {
  const [screen, setScreen] = useState7({ t: "title" });
  const [ready, setReady] = useState7(false);
  const [loadErr, setLoadErr] = useState7(null);
  const [gameKey, setGameKey] = useState7(0);
  useEffect8(() => {
    pingServer();
    const pingId = window.setInterval(() => pingServer(), 8e3);
    return () => window.clearInterval(pingId);
  }, []);
  useEffect8(() => {
    let cancelled = false;
    (async () => {
      const ok = await fetchHealth();
      if (!ok) {
        if (!cancelled) {
          setLoadErr(
            "\u30B5\u30FC\u30D0\u30FC\u306B\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093\u3002\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u306E start.bat \u304B\u3089\u8D77\u52D5\u3057\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
          );
        }
        return;
      }
      if (!cancelled) {
        setReady(true);
        setLoadErr(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const goTitle = useCallback2(() => setScreen({ t: "title" }), []);
  const onTitlePick = useCallback2((id) => {
    if (id === "story") setScreen({ t: "stage" });
    else if (id === "endless") {
      setGameKey((k) => k + 1);
      setScreen({ t: "game", mode: "endless", stage: 1 });
    } else if (id === "boss_rush") setScreen({ t: "boss_rush_select" });
    else setScreen({ t: "ranking" });
  }, []);
  const onStage = useCallback2((stage) => {
    setGameKey((k) => k + 1);
    setScreen({ t: "game", mode: "story", stage });
  }, []);
  const onBossRushStart = useCallback2((bossId, difficulty) => {
    setGameKey((k) => k + 1);
    setScreen({
      t: "game",
      mode: "boss_rush",
      stage: 1,
      bossRush: { bossId, difficulty }
    });
  }, []);
  const onGameFinish = useCallback2((data) => {
    setScreen({ t: "result", data });
  }, []);
  const onRetry = useCallback2(() => {
    const r = screen.t === "result" ? screen.data : null;
    if (!r) return;
    setGameKey((k) => k + 1);
    if (r.mode === "endless") setScreen({ t: "game", mode: "endless", stage: 1 });
    else if (r.mode === "boss_rush" && r.bossRush) {
      setScreen({
        t: "game",
        mode: "boss_rush",
        stage: 1,
        bossRush: r.bossRush
      });
    } else setScreen({ t: "game", mode: "story", stage: r.stage });
  }, [screen]);
  if (loadErr) {
    return /* @__PURE__ */ jsx12("div", { class: "min-h-screen bg-slate-950 text-red-300 flex items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsx12("p", { class: "max-w-lg", children: loadErr }) });
  }
  if (!ready) {
    return /* @__PURE__ */ jsx12("div", { class: "min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center", children: "\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026" });
  }
  if (screen.t === "title") {
    return /* @__PURE__ */ jsx12(Title, { onPick: onTitlePick });
  }
  if (screen.t === "stage") {
    return /* @__PURE__ */ jsx12(StageSelect, { onSelect: onStage, onBack: goTitle });
  }
  if (screen.t === "boss_rush_select") {
    return /* @__PURE__ */ jsx12(BossRushSelect, { onStart: onBossRushStart, onBack: goTitle });
  }
  if (screen.t === "ranking") {
    return /* @__PURE__ */ jsx12(RankingView, { onBack: goTitle });
  }
  if (screen.t === "game") {
    return /* @__PURE__ */ jsx12(
      GamePlay,
      {
        mode: screen.mode,
        startStage: screen.stage,
        bossRush: screen.mode === "boss_rush" ? screen.bossRush : void 0,
        onFinish: onGameFinish,
        onBossRushRetry: screen.mode === "boss_rush" ? () => setGameKey((k) => k + 1) : void 0
      },
      gameKey
    );
  }
  if (screen.t === "result") {
    return /* @__PURE__ */ jsx12(
      Result,
      {
        data: screen.data,
        onRetry,
        onTitle: goTitle,
        onSubmitEndless: screen.data.mode === "endless" && screen.data.outcome === "gameover" ? async (name) => {
          await postEndlessRanking(name, screen.data.score, screen.data.waveReached);
        } : void 0,
        onSubmitStory: screen.data.mode === "story" && screen.data.outcome === "ending" ? async (name) => {
          await postStoryRanking(
            name,
            screen.data.hitRate,
            Math.floor(screen.data.timeSec)
          );
        } : void 0,
        onSubmitBossRush: screen.data.mode === "boss_rush" && screen.data.outcome === "ending" && screen.data.bossRush ? async (name) => {
          await postBossRushRanking(
            name,
            screen.data.timeSec,
            screen.data.bossRush.bossId,
            screen.data.bossRush.difficulty
          );
        } : void 0
      }
    );
  }
  return /* @__PURE__ */ jsx12(Title, { onPick: onTitlePick });
}
render(/* @__PURE__ */ jsx12(App, {}), document.getElementById("root"));
export {
  App
};

import type { JSX } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import type { WordRow } from "../api/client.ts";
import { unlockAchievement } from "../api/client.ts";
import type { GameMode } from "../game/engine.ts";
import { GameEngine, laneCenterYpx } from "../game/engine.ts";
import type { Monster } from "../game/monster.ts";
import { monsterImagePath } from "../game/monster.ts";
import type { ResultPayload } from "./Result.tsx";
import { ControlsHelp } from "./ControlsHelp.tsx";
import { DefeatEffect } from "./DefeatEffect.tsx";
import { DPad } from "./DPad.tsx";

type Props = {
  words: WordRow[];
  mode: GameMode;
  startStage: number;
  onFinish: (r: ResultPayload) => void;
};

const PAUSE_MENU = [
  { id: "resume" as const, label: "RESUME" },
  { id: "quit" as const, label: "QUIT TO TITLE" },
];

type DeathFx = {
  id: string;
  x: number;
  yPx: number;
  src: string;
  key: string;
};

function laneTopPct(lane: number): number {
  return 18 + lane * 16;
}

export function GamePlay({ words, mode, startStage, onFinish }: Props): JSX.Element {
  const fieldRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  if (!engineRef.current) {
    engineRef.current = new GameEngine(mode, startStage, words);
  }

  const [, setTick] = useState(0);
  const [pauseIdx, setPauseIdx] = useState(0);
  const pauseIdxRef = useRef(0);
  pauseIdxRef.current = pauseIdx;
  const finishedRef = useRef(false);
  const prevPhaseRef = useRef(engineRef.current!.snapshot(800, 440).phase);
  const unlockedRef = useRef<Set<string>>(new Set());
  const keysHeld = useRef<Set<string>>(new Set());
  const [deathFx, setDeathFx] = useState<DeathFx[]>([]);
  const deathKey = useRef(0);

  const removeDeathFx = useCallback((k: string) => {
    setDeathFx((xs) => xs.filter((z) => z.key !== k));
  }, []);

  const safeUnlock = (id: string) => {
    if (unlockedRef.current.has(id)) return;
    unlockedRef.current.add(id);
    void unlockAchievement(id).catch(() => {});
  };

  const pushDeathFx = (m: Monster, playHeight: number) => {
    deathKey.current += 1;
    const fx: DeathFx = {
      id: m.id,
      x: m.x,
      yPx: laneCenterYpx(m.lane, playHeight),
      src: monsterImagePath(m),
      key: `d-${deathKey.current}`,
    };
    safeUnlock("first_blood");
    setDeathFx((xs) => [...xs, fx]);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keysHeld.current.add(k);
    };
    const up = (e: KeyboardEvent) => {
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

  useEffect(() => {
    const eng = engineRef.current!;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const w = fieldRef.current?.clientWidth ?? 800;
      const h = fieldRef.current?.clientHeight ?? 440;

      for (const m of eng.pullDefeatFxMonsters()) {
        pushDeathFx(m, h);
      }

      const beforeSnap = eng.snapshot(w, h);

      if (beforeSnap.phase === "playing" && !beforeSnap.paused && !beforeSnap.targetId) {
        const v = 300 * dt;
        if (keysHeld.current.has("a") || keysHeld.current.has("arrowleft")) {
          eng.moveCrosshair(-v, 0, w, h);
        }
        if (keysHeld.current.has("d") || keysHeld.current.has("arrowright")) {
          eng.moveCrosshair(v, 0, w, h);
        }
        if (keysHeld.current.has("w") || keysHeld.current.has("arrowup")) {
          eng.moveCrosshair(0, -v, w, h);
        }
        if (keysHeld.current.has("s") || keysHeld.current.has("arrowdown")) {
          eng.moveCrosshair(0, v, w, h);
        }
      }

      eng.step(dt, now, w, h);
      for (const m of eng.pullDefeatFxMonsters()) {
        pushDeathFx(m, h);
      }
      const s = eng.snapshot(w, h);
      if (s.killTimes.length >= 3) safeUnlock("speed_demon");

      const pp = prevPhaseRef.current;
      if (pp === "playing" && s.phase === "interwave" && s.lastWaveWasPerfect) {
        safeUnlock("perfect_wave");
      }
      if (s.mode === "endless" && s.waveGlobal >= 50) {
        safeUnlock("wave_survivor_50");
      }
      if (s.phase === "ending") {
        safeUnlock("fortress_guardian");
      }
      prevPhaseRef.current = s.phase;

      if ((s.phase === "gameover" || s.phase === "ending") && !finishedRef.current) {
        finishedRef.current = true;
        const acc = s.totalTyped > 0 ? s.correctTyped / s.totalTyped : 0;
        const timeSec = Math.floor((Date.now() - eng.startTime) / 1000);
        onFinish({
          outcome: s.phase === "ending" ? "ending" : "gameover",
          score: s.score,
          waveReached: s.waveGlobal,
          accuracy: acc,
          timeSec,
          mode: s.mode,
          stage: s.stage,
        });
      }

      setTick((x) => x + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [onFinish]);

  const w = fieldRef.current?.clientWidth ?? 800;
  const h = fieldRef.current?.clientHeight ?? 440;
  const s = engineRef.current.snapshot(w, h);
  const locked = s.monsters.find((m) => m.id === s.targetId) ?? null;

  useEffect(() => {
    const eng = engineRef.current!;
    const onKey = (e: KeyboardEvent) => {
      const sw = fieldRef.current?.clientWidth ?? 800;
      const sh = fieldRef.current?.clientHeight ?? 440;
      const snap = eng.snapshot(sw, sh);
      if (finishedRef.current) return;

      if (snap.phase === "paused") {
        if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
          e.preventDefault();
          setPauseIdx((x) => (x - 1 + PAUSE_MENU.length) % PAUSE_MENU.length);
        }
        if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
          e.preventDefault();
          setPauseIdx((x) => (x + 1) % PAUSE_MENU.length);
        }
        if (e.key === "Enter") {
          e.preventDefault();
          const pi = pauseIdxRef.current;
          if (pi === 0) {
            eng.togglePause();
            setPauseIdx(0);
          } else {
            finishedRef.current = true;
            const acc = snap.totalTyped > 0 ? snap.correctTyped / snap.totalTyped : 0;
            const timeSec = Math.floor((Date.now() - eng.startTime) / 1000);
            onFinish({
              outcome: "quit",
              score: snap.score,
              waveReached: snap.waveGlobal,
              accuracy: acc,
              timeSec,
              mode: snap.mode,
              stage: snap.stage,
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

        if (!snap.targetId) {
          if (e.key === "Enter") {
            e.preventDefault();
            if (!e.repeat) eng.tryBeginTyping(sw, sh);
          }
          return;
        }

        if (e.key === "Backspace") {
          e.preventDefault();
          eng.cancelTyping();
          return;
        }

        if (e.key.length === 1) {
          const ch = e.key.toLowerCase();
          if (ch >= "a" && ch <= "z") {
            e.preventDefault();
            eng.keyDown(e.key, performance.now(), sw);
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onFinish]);

  const hearts = Array.from({ length: s.maxHp }, (_, i) => i < s.fortressHp);

  return (
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header class="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900/80 shrink-0">
        <div class="flex gap-1" aria-label="要塞HP">
          {hearts.map((ok, i) => (
            <span key={i} class={ok ? "text-red-500 text-xl" : "text-slate-700 text-xl"}>
              ♥
            </span>
          ))}
        </div>
        <div class="font-mono text-amber-300 text-sm flex-1">
          {s.mode === "story" ? `STAGE ${s.stage} · WAVE ${s.waveInStage}/10` : `WAVE ${s.waveGlobal}`}
          <span class="text-slate-500 ml-2">· W#{s.waveGlobal}</span>
        </div>
        <div class="font-mono text-emerald-400">SCORE {s.score}</div>
        <div class="font-mono text-slate-500 text-xs">COMBO ×{s.combo}</div>
        <div class="text-slate-500 text-xs hidden sm:block">[Esc] ポーズ</div>
      </header>

      <div
        ref={fieldRef}
        class="relative flex-1 min-h-[280px] bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden mx-2 mt-2 rounded-lg border border-slate-800"
      >
        {s.phase === "announce" ? (
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="text-center">
              <div class="text-3xl font-black text-amber-400 drop-shadow-lg">{s.announceLabel}</div>
              <div class="text-slate-400 mt-2 font-mono">{Math.ceil(s.phaseTimer)}</div>
            </div>
          </div>
        ) : null}
        {s.phase === "interwave" ? (
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="text-center">
              <div class="text-xl font-bold text-slate-300">INTERVAL</div>
              <div class="text-slate-500 mt-2 text-sm">次のウェーブまで… {Math.ceil(s.phaseTimer)}s</div>
            </div>
          </div>
        ) : null}

        {s.phase === "paused" ? (
          <div class="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-30 gap-6 px-4">
            <div class="text-4xl font-black tracking-widest text-amber-200">PAUSED</div>
            <div class="flex flex-col gap-2 w-full max-w-xs">
              {PAUSE_MENU.map((it, idx) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => {
                    if (it.id === "resume") {
                      engineRef.current!.togglePause();
                      setPauseIdx(0);
                    } else {
                      finishedRef.current = true;
                      const eng = engineRef.current!;
                      const sw = fieldRef.current?.clientWidth ?? 800;
                      const sh = fieldRef.current?.clientHeight ?? 440;
                      const sh2 = eng.snapshot(sw, sh);
                      const acc = sh2.totalTyped > 0 ? sh2.correctTyped / sh2.totalTyped : 0;
                      onFinish({
                        outcome: "quit",
                        score: sh2.score,
                        waveReached: sh2.waveGlobal,
                        accuracy: acc,
                        timeSec: Math.floor((Date.now() - eng.startTime) / 1000),
                        mode: sh2.mode,
                        stage: sh2.stage,
                      });
                    }
                  }}
                  class={`rounded-xl border px-4 py-3 font-mono text-left w-full ${
                    idx === pauseIdx
                      ? "border-amber-400 bg-amber-500/15 text-amber-100"
                      : "border-slate-600 bg-slate-900/60"
                  }`}
                >
                  [{it.label}]
                </button>
              ))}
            </div>
            <div class="flex flex-col sm:flex-row items-start gap-4 w-full max-w-lg justify-center">
              <ControlsHelp variant="game_pause" className="flex-1 max-w-md" />
              <div class="flex flex-col items-center gap-2 mx-auto sm:mx-0">
                <span class="text-[10px] uppercase tracking-widest text-slate-500">十字操作</span>
                <DPad
                  variant="vertical"
                  onDirection={(d) => {
                    if (d === "up") setPauseIdx((x) => (x - 1 + PAUSE_MENU.length) % PAUSE_MENU.length);
                    if (d === "down") setPauseIdx((x) => (x + 1) % PAUSE_MENU.length);
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}

        <div class="absolute left-2 z-[5] text-2xl select-none" style={{ top: `${laneTopPct(1)}%`, transform: "translateY(-50%)" }} aria-hidden>
          ▣
        </div>
        <div
          class="absolute left-10 z-[5] text-xs text-slate-500 -rotate-90 origin-left"
          style={{ top: `${laneTopPct(1)}%`, transform: "translateY(-50%)" }}
        >
          要塞
        </div>

        {deathFx.map((fx) => (
          <DefeatEffect
            key={fx.key}
            fxKey={fx.key}
            x={fx.x}
            y={fx.yPx}
            src={fx.src}
            onRemove={removeDeathFx}
          />
        ))}

        {s.phase === "playing" && !s.paused ? (
          <div
            class={`absolute z-[25] pointer-events-none flex flex-col items-center ${
              s.targetId ? "opacity-40" : ""
            }`}
            style={{
              left: `${s.crosshairX}px`,
              top: `${s.crosshairY}px`,
              transform: "translate(-50%, -50%)",
            }}
            aria-hidden
          >
            <div class="relative h-[4.5rem] w-[4.5rem] flex items-center justify-center">
              <div class="absolute inset-0 rounded-full border-2 border-cyan-400/90 shadow-[0_0_14px_rgba(34,211,238,0.55)]" />
              <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-cyan-400/80 -translate-x-1/2" />
              <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-400/80 -translate-y-1/2" />
            </div>
            <span class="mt-0.5 text-[10px] font-bold text-cyan-300 tracking-wider">AIM</span>
          </div>
        ) : null}

        {s.monsters.map((m) => {
          const lockedHere = m.id === s.targetId;
          const hoverHere = !s.targetId && m.id === s.hoverTargetId;
          const topPct = laneTopPct(m.lane);
          return (
            <div
              key={m.id}
              class={`absolute flex flex-col items-center gap-0.5 transition-[left] duration-75 z-10 ${
                lockedHere
                  ? "ring-2 ring-amber-400 rounded-xl p-0.5 shadow-[0_0_20px_rgba(251,191,36,0.45)]"
                  : hoverHere
                    ? "ring-2 ring-cyan-400/80 rounded-xl p-0.5"
                    : "opacity-95"
              }`}
              style={{ left: `${m.x}px`, top: `${topPct}%`, transform: "translate(-50%, -50%)" }}
            >
              {lockedHere ? (
                <span class="text-[9px] font-bold uppercase text-amber-300">LOCK</span>
              ) : hoverHere ? (
                <span class="text-[9px] font-bold uppercase text-cyan-300">AIM</span>
              ) : null}
              <img
                src={monsterImagePath(m)}
                alt=""
                class={`h-11 sm:h-12 w-auto max-w-[72px] object-contain select-none ${m.isRare ? "drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" : ""}`}
                draggable={false}
              />
              <span
                class={`font-mono text-[10px] sm:text-xs px-1.5 py-0.5 rounded max-w-[min(220px,70vw)] break-all text-center leading-tight ${
                  lockedHere
                    ? "bg-amber-950/95 border border-amber-400 text-amber-50"
                    : "bg-slate-900/95 border border-slate-600 text-slate-100"
                }`}
              >
                {lockedHere ? (
                  <>
                    <span class="text-emerald-400 font-semibold">
                      {m.word.slice(0, s.inputBuffer.length)}
                    </span>
                    <span class="text-slate-200">{m.word.slice(s.inputBuffer.length)}</span>
                  </>
                ) : (
                  m.word
                )}
                {m.isRare ? <span class="ml-1 text-yellow-300 font-bold">RARE</span> : null}
                {m.isBoss ? (
                  <span class="text-red-400 ml-1">
                    ({m.hp}/{m.maxHp})
                  </span>
                ) : null}
              </span>
            </div>
          );
        })}
      </div>

      <footer class="shrink-0 border-t border-slate-800 bg-slate-900/90 px-4 py-3 space-y-3">
        <div class="rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2">
          <div class="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider mb-1">
            いま打っている単語
          </div>
          {locked ? (
            <div class="text-slate-400 text-sm">
              タイプの進捗は、<span class="text-amber-200 font-medium">画面上の敵の下の単語</span>
              が緑色に伸びていきます。
            </div>
          ) : (
            <div class="text-slate-500 text-sm">照準を合わせて Enter でロックしてください。</div>
          )}
        </div>
        <div class="mt-2 flex flex-col sm:flex-row gap-4 items-start justify-between">
          <ControlsHelp variant="game" className="flex-1 max-w-lg" />
          <p class="text-[10px] text-slate-600 max-w-md sm:max-w-xs leading-relaxed">
            WASD（長押し可）で照準を滑らかに移動 ·{" "}
            <span class="text-cyan-300/90 font-semibold">Enter</span> でロック。
            撃破時はリング拡散とスプライトの縮小アニメ（GSAP）が最前面に表示されます。
          </p>
        </div>
      </footer>
    </div>
  );
}

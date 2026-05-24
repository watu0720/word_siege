import type { JSX } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { unlockAchievement } from "../api/client.ts";
import type { GameMode } from "../game/engine.ts";
import { GameEngine, laneCenterYpx, PLAYFIELD_HEIGHT, PLAYFIELD_WIDTH } from "../game/engine.ts";
import type { BossRushDifficulty, Monster } from "../game/monster.ts";
import { monsterDisplayScale, monsterImagePath, monsterWorldY } from "../game/monster.ts";
import type { UpgradeId } from "../game/upgrades.ts";
import { listActiveUpgrades } from "../game/upgrades.ts";
import type { ResultPayload } from "./Result.tsx";
import { ControlsHelp } from "./ControlsHelp.tsx";
import { DefeatEffect } from "./DefeatEffect.tsx";
import { DPad } from "./DPad.tsx";
import { MonsterHpBar } from "./HpBar.tsx";
import { UpgradeSelectOverlay } from "./UpgradeSelect.tsx";

type Props = {
  mode: GameMode;
  startStage: number;
  bossRush?: { bossId: number; difficulty: BossRushDifficulty };
  onFinish: (r: ResultPayload) => void;
  /** BOSS RUSH のポーズから同条件でやり直し（親が gameKey を進めて再マウント） */
  onBossRushRetry?: () => void;
};

function bossRushResultExtra(s: {
  mode: GameMode;
  bossRushBossId?: number;
  bossRushDifficulty?: BossRushDifficulty;
}): Pick<ResultPayload, "bossRush"> {
  if (s.mode !== "boss_rush") return {};
  if (s.bossRushBossId == null || !s.bossRushDifficulty) return {};
  return {
    bossRush: { bossId: s.bossRushBossId, difficulty: s.bossRushDifficulty },
  };
}

function clearTimeSec(mode: GameMode, startMs: number): number {
  const sec = (Date.now() - startMs) / 1000;
  return mode === "boss_rush" ? Math.round(sec * 10) / 10 : Math.floor(sec);
}

type PauseMenuId = "resume" | "retry" | "quit";

function pauseMenuItems(mode: GameMode): { id: PauseMenuId; label: string }[] {
  if (mode === "boss_rush") {
    return [
      { id: "resume", label: "RESUME" },
      { id: "retry", label: "RETRY" },
      { id: "quit", label: "QUIT TO TITLE" },
    ];
  }
  return [
    { id: "resume", label: "RESUME" },
    { id: "quit", label: "QUIT TO TITLE" },
  ];
}

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

const PW = PLAYFIELD_WIDTH;
const PH = PLAYFIELD_HEIGHT;

export function GamePlay({ mode, startStage, bossRush, onFinish, onBossRushRetry }: Props): JSX.Element {
  const fieldRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  if (!engineRef.current) {
    engineRef.current = new GameEngine(mode, startStage, bossRush);
  }

  const [, setTick] = useState(0);
  const [pauseIdx, setPauseIdx] = useState(0);
  const pauseIdxRef = useRef(0);
  pauseIdxRef.current = pauseIdx;
  const [upgradeIdx, setUpgradeIdx] = useState(0);
  const upgradeIdxRef = useRef(0);
  upgradeIdxRef.current = upgradeIdx;
  const finishedRef = useRef(false);
  const prevPhaseRef = useRef(engineRef.current!.snapshot(PW, PH).phase);
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
      yPx: monsterWorldY(m, playHeight),
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
        const enterHeld =
          keysHeld.current.has("Enter") || keysHeld.current.has("NumpadEnter");
        if (enterHeld) eng.tryFire(now);
      }

      eng.step(dt, now, PW, PH);
      for (const m of eng.pullDefeatFxMonsters()) {
        pushDeathFx(m, PH);
      }
      const s = eng.snapshot(PW, PH);
      if (s.killTimes.length >= 5) safeUnlock("rapid_fire");

      const pp = prevPhaseRef.current;
      if (
        pp === "playing" &&
        (s.phase === "upgrade_select" || s.phase === "wave_clear") &&
        s.lastWaveWasPerfect
      ) {
        safeUnlock("perfect_wave");
      }
      if (s.mode === "endless" && s.waveGlobal >= 50) {
        safeUnlock("wave_survivor_50");
      }
      if (s.phase === "ending") {
        safeUnlock("fortress_guardian");
      }
      if (s.phase === "upgrade_select" && pp !== "upgrade_select") {
        setUpgradeIdx(0);
        upgradeIdxRef.current = 0;
      }
      prevPhaseRef.current = s.phase;

      if ((s.phase === "gameover" || s.phase === "ending") && !finishedRef.current) {
        finishedRef.current = true;
        const hitRate = s.shotsFired > 0 ? s.hitsLanded / s.shotsFired : 0;
        const timeSec = clearTimeSec(s.mode, eng.startTime);
        onFinish({
          outcome: s.phase === "ending" ? "ending" : "gameover",
          score: s.score,
          waveReached: s.waveGlobal,
          hitRate,
          shotsFired: s.shotsFired,
          hitsLanded: s.hitsLanded,
          timeSec,
          mode: s.mode,
          stage: s.stage,
          ...bossRushResultExtra(s),
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

  useEffect(() => {
    const eng = engineRef.current!;
    const onKey = (e: KeyboardEvent) => {
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
              ...bossRushResultExtra(snap),
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

  const hpBarVariant = (m: Monster): "normal" | "elite" | "boss" => {
    if (m.isBoss) return "boss";
    if (m.isElite) return "elite";
    return "normal";
  };

  const confirmUpgradeFromUi = (id: UpgradeId) => {
    engineRef.current!.confirmUpgrade(id);
  };

  return (
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center">
      <header class="w-full max-w-[1008px] flex flex-wrap items-center gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900/80 shrink-0 box-border">
        <div class="flex gap-1" aria-label="自機HP">
          {hearts.map((ok, i) => (
            <span key={i} class={ok ? "text-red-500 text-xl" : "text-slate-700 text-xl"}>
              ♥
            </span>
          ))}
        </div>
        <div class="font-mono text-amber-300 text-sm flex-1">
          {s.mode === "boss_rush" && s.bossRushBossId != null && s.bossRushDifficulty ? (
            <>
              BOSS RUSH · BOSS {s.bossRushBossId} · {s.bossRushDifficulty.toUpperCase()}
            </>
          ) : s.mode === "story" ? (
            `STAGE ${s.stage} · WAVE ${s.waveInStage}/10`
          ) : (
            `WAVE ${s.waveGlobal}`
          )}
          {s.mode === "endless" ? (
            <span class="text-slate-500 ml-2">· W#{s.waveGlobal}</span>
          ) : null}
        </div>
        <div class="font-mono text-emerald-400">SCORE {s.score}</div>
        <div class="font-mono text-slate-500 text-xs">COMBO ×{s.combo}</div>
        <div class="text-slate-500 text-xs hidden sm:block">[Esc] ポーズ</div>
      </header>

      <div class="w-full max-w-[1008px] flex flex-col items-center px-2 box-border">
        <div
          ref={fieldRef}
          class="relative shrink-0 bg-slate-950 overflow-hidden rounded-lg border border-slate-800"
          style={{ width: `${PW}px`, height: `${PH}px` }}
        >
          <div class="absolute inset-0 z-0 overflow-hidden rounded-lg pointer-events-none">
            <img
              key={s.stageBackgroundUrl}
              src={s.stageBackgroundUrl}
              alt=""
              class="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <div
              class="absolute inset-0 bg-slate-950/40"
              aria-hidden
            />
          </div>
          {s.phase === "announce" ? (
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div class="text-center px-2">
                <div class="text-2xl sm:text-3xl font-black text-amber-400 drop-shadow-lg leading-tight">
                  {s.announceLabel}
                </div>
                <div class="text-slate-400 mt-2 font-mono">{Math.ceil(s.phaseTimer)}</div>
              </div>
            </div>
          ) : null}

          {s.phase === "wave_clear" ? (
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-[55] bg-black/50">
              <div class="text-center px-2">
                <div class="text-4xl sm:text-5xl font-black tracking-wide text-white drop-shadow-[0_0_20px_rgba(16,185,129,0.9)] [text-shadow:_0_2px_8px_rgb(0_0_0_/_0.85)]">
                  {s.announceLabel}
                </div>
              </div>
            </div>
          ) : null}

          {s.phase === "game_over_banner" ? (
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-[55] bg-black/50">
              <div class="text-center px-2">
                <div class="text-4xl sm:text-5xl font-black tracking-wide text-rose-200 drop-shadow-[0_0_20px_rgba(244,63,94,0.85)] [text-shadow:_0_2px_8px_rgb(0_0_0_/_0.85)]">
                  {s.announceLabel}
                </div>
              </div>
            </div>
          ) : null}

          {s.phase === "upgrade_select" && s.mode !== "boss_rush" ? (
            <UpgradeSelectOverlay
              waveGlobal={s.waveGlobal}
              choices={s.upgradeChoices}
              stacks={s.upgradeStacks}
              selectedIdx={upgradeIdx}
              onSelectIndex={(i) => {
                setUpgradeIdx(i);
                upgradeIdxRef.current = i;
              }}
              onConfirm={confirmUpgradeFromUi}
            />
          ) : null}

          {s.phase === "interwave" && s.upgradeFlashSec > 0 ? (
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div class="text-base font-bold text-cyan-300 drop-shadow-lg">強化を取得！</div>
            </div>
          ) : null}

          {s.phase === "paused" ? (
            <div class="absolute inset-0 bg-black/75 flex flex-col items-center justify-center z-30 gap-4 px-3 py-4 overflow-y-auto">
              <div class="text-3xl font-black tracking-widest text-amber-200">PAUSED</div>

              <div class="w-full max-w-sm rounded-lg border border-slate-600 bg-slate-950/90 px-3 py-2 text-left">
                <div class="text-[10px] uppercase tracking-widest text-slate-500 mb-1">取得中の強化</div>
                {activeUps.length === 0 ? (
                  <p class="text-xs text-slate-500">まだありません</p>
                ) : (
                  <ul class="text-xs text-slate-300 space-y-0.5 max-h-32 overflow-y-auto">
                    {activeUps.map((u) => (
                      <li key={u.name}>
                        {u.name} ×{u.count}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div class="flex flex-col gap-2 w-full max-w-xs">
                {pauseMenuItems(s.mode).map((it, idx) => (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => {
                      if (it.id === "resume") {
                        engineRef.current!.togglePause();
                        setPauseIdx(0);
                      } else if (it.id === "retry") {
                        onBossRushRetry?.();
                      } else {
                        finishedRef.current = true;
                        const eng = engineRef.current!;
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
                          ...bossRushResultExtra(sh2),
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
                      const plen = pauseMenuItems(s.mode).length;
                      if (d === "up") setPauseIdx((x) => (x - 1 + plen) % plen);
                      if (d === "down") setPauseIdx((x) => (x + 1) % plen);
                    }}
                  />
                </div>
              </div>
            </div>
          ) : null}

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

          {s.bullets.map((b) => (
            <div
              key={b.id}
              class="absolute z-[15] w-2.5 h-2.5 rounded-full bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.85)] pointer-events-none"
              style={{
                left: `${b.x}px`,
                top: `${b.y}px`,
                transform: "translate(-50%, -50%)",
              }}
              aria-hidden
            />
          ))}

          {s.enemyBullets.map((eb) => {
            const big = eb.variant === "boss_burger";
            const speed = Math.hypot(eb.vx, eb.vy);
            const trailLen = Math.min(big ? 96 : 76, (big ? 28 : 18) + speed * 0.16);
            const trailW = big ? 10 : 6;
            /** 進行方向の「後ろ」＝速度の逆ベクトル（トレイルは弾の中心からこちらへ伸ばす） */
            const trailAngDeg = (Math.atan2(-eb.vy, -eb.vx) * 180) / Math.PI;
            /** 飛翔エフェクトは黄色系（通常弾・特殊弾共通トーン） */
            const rgb = big ? "250, 204, 21" : "253, 224, 71";
            const imgRotDeg = (Math.atan2(eb.vy, eb.vx) * 180) / Math.PI;
            const bossTrailOuter = Math.min(140, trailLen * 1.48 + speed * 0.12);
            const bossTrailMid = Math.min(118, trailLen * 1.15 + speed * 0.08);
            const sparkT = [0.18, 0.38, 0.58, 0.78] as const;
            return (
              <div
                key={eb.id}
                class="absolute z-[16] pointer-events-none select-none"
                style={{
                  left: `${eb.x}px`,
                  top: `${eb.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
                aria-hidden
              >
                {big ? (
                  <>
                    <div
                      class="absolute rounded-full boss-burger-trail-outer-animate"
                      style={{
                        width: `${bossTrailOuter}px`,
                        height: `${trailW + 16}px`,
                        left: "50%",
                        top: "50%",
                        transform: `translate(0, -50%) rotate(${trailAngDeg}deg)`,
                        transformOrigin: "0 50%",
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0.35) 0%, rgba(254,243,199,0.5) 12%, rgba(251,191,36,0.35) 38%, rgba(245,158,11,0.12) 65%, rgba(250,204,21,0) 100%)",
                        filter: "blur(6px)",
                        boxShadow: "0 0 22px rgba(250,204,21,0.45)",
                      }}
                    />
                    <div
                      class="absolute rounded-full boss-burger-trail-mid-animate"
                      style={{
                        width: `${bossTrailMid}px`,
                        height: `${trailW + 8}px`,
                        left: "50%",
                        top: "50%",
                        transform: `translate(0, -50%) rotate(${trailAngDeg}deg)`,
                        transformOrigin: "0 50%",
                        background:
                          "linear-gradient(90deg, rgba(255,251,235,0.9) 0%, rgba(251,146,60,0.65) 22%, rgba(250,204,21,0.55) 48%, rgba(234,179,8,0.2) 78%, rgba(250,204,21,0) 100%)",
                        filter: "blur(2.5px)",
                        boxShadow: "0 0 14px rgba(251,146,60,0.55)",
                      }}
                    />
                    <div
                      class="absolute left-1/2 top-1/2 w-0 h-0"
                      style={{ transform: `rotate(${trailAngDeg}deg)` }}
                    >
                      {sparkT.map((t, si) => (
                        <div
                          key={si}
                          class="absolute rounded-full boss-burger-spark-animate"
                          style={{
                            left: `${bossTrailMid * t}px`,
                            top: `${Math.sin(t * 12.9898 + si) * 5}px`,
                            width: si % 2 === 0 ? 7 : 5,
                            height: si % 2 === 0 ? 7 : 5,
                            background:
                              "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(254,240,138,0.85) 45%, rgba(250,204,21,0.2) 100%)",
                            boxShadow:
                              "0 0 10px rgba(255,237,160,0.95), 0 0 18px rgba(251,191,36,0.65)",
                            animationDelay: `${si * 0.13}s`,
                          }}
                        />
                      ))}
                    </div>
                  </>
                ) : null}
                <div
                  class={`absolute rounded-full opacity-[0.92] ${big ? "boss-burger-trail-core-animate" : ""}`}
                  style={{
                    width: `${trailLen}px`,
                    height: `${trailW}px`,
                    left: "50%",
                    top: "50%",
                    transform: `translate(0, -50%) rotate(${trailAngDeg}deg)`,
                    transformOrigin: "0 50%",
                    background: `linear-gradient(90deg, rgba(254,252,232,0.65) 0%, rgba(${rgb},0.88) 20%, rgba(${rgb},0.5) 48%, rgba(${rgb},0) 100%)`,
                    filter: big
                      ? "blur(1.5px) drop-shadow(0 0 10px rgba(250,204,21,0.85))"
                      : "blur(1px) drop-shadow(0 0 5px rgba(253,224,71,0.55))",
                  }}
                />
                {big ? (
                  <>
                    <div class="absolute left-1/2 top-1/2 z-0 flex h-0 w-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center boss-burger-aura-fade-wrap">
                      <div
                        class="boss-burger-aura-ring-outer flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-full border-2 border-amber-200/50 shadow-[0_0_18px_rgba(250,204,21,0.55),inset_0_0_14px_rgba(254,243,199,0.35)]"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(255,251,235,0.15) 0%, rgba(251,191,36,0.08) 55%, transparent 72%)",
                        }}
                      />
                    </div>
                    <div class="absolute left-1/2 top-1/2 z-0 flex h-0 w-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center boss-burger-aura-fade-wrap--alt">
                      <div
                        class="boss-burger-aura-ring-inner flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-yellow-200/70 opacity-90 shadow-[0_0_12px_rgba(253,224,71,0.5)]"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(255,255,235,0.12) 0%, transparent 70%)",
                        }}
                      />
                    </div>
                  </>
                ) : null}
                <img
                  src={big ? "/assets/boss_burger_bullet.png" : "/assets/enemy_bullet.png"}
                  alt=""
                  class={`relative z-[1] object-contain drop-shadow-md ${
                    big ? "w-[52px] h-[52px] boss-burger-sprite-glow-animate" : "w-8 h-8"
                  }`}
                  style={{
                    transform: `rotate(${imgRotDeg}deg) scaleY(-1)`,
                  }}
                  draggable={false}
                />
              </div>
            );
          })}

          {(s.phase === "playing" && !s.paused) || s.phase === "game_over_banner" ? (
            <div
              class="absolute z-[25] pointer-events-none flex flex-col items-center"
              style={{
                left: `${s.crosshairX}px`,
                top: `${s.crosshairY}px`,
                transform: "translate(-50%, -50%)",
              }}
              aria-hidden
            >
              <img
                src="/assets/player.png"
                alt=""
                class={`w-[72px] h-[72px] object-contain select-none [filter:drop-shadow(0_4px_12px_rgba(0,0,0,0.5))_drop-shadow(0_0_18px_rgba(244,114,182,0.65))_drop-shadow(0_0_32px_rgba(34,211,238,0.28))] ${
                  s.playerIframesSec > 0 ? "player-iframes-blink" : ""
                }`}
                draggable={false}
              />
            </div>
          ) : null}

          {s.monsters.map((m) => {
            const sc = monsterDisplayScale(m);
            const bossTall = m.isBoss ? 1.22 : 1;
            const posStyle = m.isBoss
              ? ({ top: `${monsterWorldY(m, PH)}px` } as const)
              : ({ top: `${laneTopPct(m.lane)}%` } as const);
            return (
              <div
                key={m.id}
                class="absolute flex flex-col items-center gap-0.5 transition-[left] duration-75 z-10 opacity-95"
                style={{ left: `${m.x}px`, ...posStyle, transform: "translate(-50%, -50%)" }}
              >
                <MonsterHpBar
                  hp={m.hp}
                  maxHp={m.maxHp}
                  variant={hpBarVariant(m)}
                  showNumeric={m.isBoss}
                />
                <img
                  src={monsterImagePath(m)}
                  alt=""
                  class={`w-auto object-contain select-none ${m.isRare ? "drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" : ""}`}
                  style={{
                    height: `${(m.isBoss ? 88 : m.isElite ? 52 : 48) * sc * bossTall}px`,
                    maxWidth: `${(m.isBoss ? 132 : m.isElite ? 92 : 88) * sc}px`,
                  }}
                  draggable={false}
                />
                {m.isRare ? (
                  <span class="text-[9px] font-bold text-yellow-300">RARE</span>
                ) : m.isElite ? (
                  <span class="text-[9px] font-bold text-orange-400">ELITE</span>
                ) : m.isBoss ? (
                  <span class="text-[9px] font-bold text-red-400">BOSS</span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <footer class="w-full max-w-[1008px] shrink-0 border-t border-slate-800 bg-slate-900/90 px-4 py-3 space-y-3 box-border">
        <div class="rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2">
          <div class="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider mb-1">
            操作
          </div>
          <p class="text-slate-400 text-sm">
            <span class="text-pink-300 font-semibold">自機</span>を WASD / 矢印で動かし、
            <span class="text-cyan-300 font-semibold">Enter</span> で弾を発射。敵の弾に当たると ♥ が減ります。
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 items-start justify-between">
          <ControlsHelp variant="game" className="flex-1 max-w-lg" />
          <p class="text-[10px] text-slate-600 max-w-md sm:max-w-xs leading-relaxed">
            プレイ画面は {PW}×{PH}px 固定です。
          </p>
        </div>
      </footer>
    </div>
  );
}

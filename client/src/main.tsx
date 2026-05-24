import { render } from "preact";
import type { JSX } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import {
  fetchHealth,
  pingServer,
  postBossRushRanking,
  postEndlessRanking,
  postStoryRanking,
} from "./api/client.ts";
import type { BossRushDifficulty } from "./game/monster.ts";
import { BossRushSelect } from "./ui/BossRushSelect.tsx";
import { GamePlay } from "./ui/Game.tsx";
import type { ResultPayload } from "./ui/Result.tsx";
import { Result } from "./ui/Result.tsx";
import { RankingView } from "./ui/Ranking.tsx";
import { StageSelect } from "./ui/StageSelect.tsx";
import { Title } from "./ui/Title.tsx";

type Screen =
  | { t: "title" }
  | { t: "stage" }
  | { t: "boss_rush_select" }
  | { t: "ranking" }
  | { t: "game"; mode: "story"; stage: number }
  | { t: "game"; mode: "endless"; stage: number }
  | {
      t: "game";
      mode: "boss_rush";
      stage: number;
      bossRush: { bossId: number; difficulty: BossRushDifficulty };
    }
  | { t: "result"; data: ResultPayload };

export function App(): JSX.Element {
  const [screen, setScreen] = useState<Screen>({ t: "title" });
  const [ready, setReady] = useState(false);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    pingServer();
    const pingId = window.setInterval(() => pingServer(), 8000);
    return () => window.clearInterval(pingId);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await fetchHealth();
      if (!ok) {
        if (!cancelled) {
          setLoadErr(
            "サーバーに接続できません。プロジェクトの start.bat から起動し直してください。",
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

  const goTitle = useCallback(() => setScreen({ t: "title" }), []);

  const onTitlePick = useCallback((id: "story" | "endless" | "boss_rush" | "ranking") => {
    if (id === "story") setScreen({ t: "stage" });
    else if (id === "endless") {
      setGameKey((k) => k + 1);
      setScreen({ t: "game", mode: "endless", stage: 1 });
    } else if (id === "boss_rush") setScreen({ t: "boss_rush_select" });
    else setScreen({ t: "ranking" });
  }, []);

  const onStage = useCallback((stage: number) => {
    setGameKey((k) => k + 1);
    setScreen({ t: "game", mode: "story", stage });
  }, []);

  const onBossRushStart = useCallback((bossId: number, difficulty: BossRushDifficulty) => {
    setGameKey((k) => k + 1);
    setScreen({
      t: "game",
      mode: "boss_rush",
      stage: 1,
      bossRush: { bossId, difficulty },
    });
  }, []);

  const onGameFinish = useCallback((data: ResultPayload) => {
    setScreen({ t: "result", data });
  }, []);

  const onRetry = useCallback(() => {
    const r = screen.t === "result" ? screen.data : null;
    if (!r) return;
    setGameKey((k) => k + 1);
    if (r.mode === "endless") setScreen({ t: "game", mode: "endless", stage: 1 });
    else if (r.mode === "boss_rush" && r.bossRush) {
      setScreen({
        t: "game",
        mode: "boss_rush",
        stage: 1,
        bossRush: r.bossRush,
      });
    } else setScreen({ t: "game", mode: "story", stage: r.stage });
  }, [screen]);

  if (loadErr) {
    return (
      <div class="min-h-screen bg-slate-950 text-red-300 flex items-center justify-center px-6 text-center">
        <p class="max-w-lg">{loadErr}</p>
      </div>
    );
  }

  if (!ready) {
    return (
      <div class="min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center">
        読み込み中…
      </div>
    );
  }

  if (screen.t === "title") {
    return <Title onPick={onTitlePick} />;
  }
  if (screen.t === "stage") {
    return <StageSelect onSelect={onStage} onBack={goTitle} />;
  }
  if (screen.t === "boss_rush_select") {
    return <BossRushSelect onStart={onBossRushStart} onBack={goTitle} />;
  }
  if (screen.t === "ranking") {
    return <RankingView onBack={goTitle} />;
  }
  if (screen.t === "game") {
    return (
      <GamePlay
        key={gameKey}
        mode={screen.mode}
        startStage={screen.stage}
        bossRush={screen.mode === "boss_rush" ? screen.bossRush : undefined}
        onFinish={onGameFinish}
        onBossRushRetry={
          screen.mode === "boss_rush" ? () => setGameKey((k) => k + 1) : undefined
        }
      />
    );
  }
  if (screen.t === "result") {
    return (
      <Result
        data={screen.data}
        onRetry={onRetry}
        onTitle={goTitle}
        onSubmitEndless={
          screen.data.mode === "endless" && screen.data.outcome === "gameover"
            ? async (name) => {
                await postEndlessRanking(name, screen.data.score, screen.data.waveReached);
              }
            : undefined
        }
        onSubmitStory={
          screen.data.mode === "story" && screen.data.outcome === "ending"
            ? async (name) => {
                await postStoryRanking(
                  name,
                  screen.data.hitRate,
                  Math.floor(screen.data.timeSec),
                );
              }
            : undefined
        }
        onSubmitBossRush={
          screen.data.mode === "boss_rush" &&
          screen.data.outcome === "ending" &&
          screen.data.bossRush
            ? async (name) => {
                const br = screen.data.bossRush!;
                await postBossRushRanking(
                  name,
                  screen.data.timeSec,
                  br.bossId,
                  br.difficulty,
                );
              }
            : undefined
        }
      />
    );
  }

  return <Title onPick={onTitlePick} />;
}

render(<App />, document.getElementById("root")!);

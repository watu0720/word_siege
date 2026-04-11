import { render } from "preact";
import type { JSX } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import type { WordRow } from "./api/client.ts";
import {
  ApiError,
  fetchHealth,
  fetchWords,
  pingServer,
  postEndlessRanking,
  postStoryRanking,
} from "./api/client.ts";
import { GamePlay } from "./ui/Game.tsx";
import type { ResultPayload } from "./ui/Result.tsx";
import { Result } from "./ui/Result.tsx";
import { RankingView } from "./ui/Ranking.tsx";
import { StageSelect } from "./ui/StageSelect.tsx";
import { Title } from "./ui/Title.tsx";

type Screen =
  | { t: "title" }
  | { t: "stage" }
  | { t: "ranking" }
  | { t: "game"; mode: "story" | "endless"; stage: number }
  | { t: "result"; data: ResultPayload };

export function App(): JSX.Element {
  const [screen, setScreen] = useState<Screen>({ t: "title" });
  const [words, setWords] = useState<WordRow[] | null>(null);
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
      try {
        const w = await fetchWords();
        if (!cancelled) {
          setWords(w);
          setLoadErr(null);
        }
      } catch (e) {
        if (!cancelled) {
          if (e instanceof ApiError && e.code === "WORDS_MISSING") {
            setLoadErr(
              "単語ファイル（data/words.csv）が見つかりません。ゲームを起動できません。",
            );
          } else {
            setLoadErr((e as Error).message || "読み込みに失敗しました");
          }
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const goTitle = useCallback(() => setScreen({ t: "title" }), []);

  const onTitlePick = useCallback((id: "story" | "endless" | "ranking") => {
    if (id === "story") setScreen({ t: "stage" });
    else if (id === "endless") {
      setGameKey((k) => k + 1);
      setScreen({ t: "game", mode: "endless", stage: 1 });
    } else setScreen({ t: "ranking" });
  }, []);

  const onStage = useCallback((stage: number) => {
    setGameKey((k) => k + 1);
    setScreen({ t: "game", mode: "story", stage });
  }, []);

  const onGameFinish = useCallback((data: ResultPayload) => {
    setScreen({ t: "result", data });
  }, []);

  const onRetry = useCallback(() => {
    const r = screen.t === "result" ? screen.data : null;
    if (!r) return;
    setGameKey((k) => k + 1);
    if (r.mode === "endless") setScreen({ t: "game", mode: "endless", stage: 1 });
    else if (r.outcome === "ending") setScreen({ t: "game", mode: "story", stage: 1 });
    else setScreen({ t: "game", mode: "story", stage: r.stage });
  }, [screen]);

  if (loadErr) {
    return (
      <div class="min-h-screen bg-slate-950 text-red-300 flex items-center justify-center px-6 text-center">
        <p class="max-w-lg">{loadErr}</p>
      </div>
    );
  }

  if (!words) {
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
  if (screen.t === "ranking") {
    return <RankingView onBack={goTitle} />;
  }
  if (screen.t === "game") {
    return (
      <GamePlay
        key={gameKey}
        words={words}
        mode={screen.mode}
        startStage={screen.stage}
        onFinish={onGameFinish}
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
                await postStoryRanking(name, screen.data.accuracy, screen.data.timeSec);
              }
            : undefined
        }
      />
    );
  }

  return <Title onPick={onTitlePick} />;
}

render(<App />, document.getElementById("root")!);

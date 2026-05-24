"""Ranking read/write for endless and story modes."""
from __future__ import annotations

import json
import logging
from datetime import date
from pathlib import Path

LOG = logging.getLogger(__name__)

DEFAULT_RANKING = {"endless": [], "story": [], "boss": []}


def _load(path: Path) -> dict:
    if not path.exists():
        return json.loads(json.dumps(DEFAULT_RANKING))
    try:
        raw = path.read_text(encoding="utf-8")
        data = json.loads(raw)
        if not isinstance(data, dict):
            raise ValueError("root must be object")
        for key in ("endless", "story", "boss"):
            if key not in data or not isinstance(data[key], list):
                data[key] = []
        return data
    except (json.JSONDecodeError, ValueError) as e:
        LOG.warning("ranking.json corrupt, resetting: %s", e)
        return json.loads(json.dumps(DEFAULT_RANKING))


def _save(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def get_ranking(path: Path, mode: str) -> list:
    data = _load(path)
    return list(data.get(mode, []))


def _merge_endless(entries: list, name: str, score: int, wave: int) -> list:
    name = (name or "AAA")[:8].upper()
    others = [e for e in entries if str(e.get("name", "")).upper() != name]
    mine = next((e for e in entries if str(e.get("name", "")).upper() == name), None)
    if mine is None or int(mine.get("score", 0)) < score:
        row = {"name": name, "score": int(score), "wave": int(wave), "date": str(date.today())}
        others.append(row)
    else:
        others.append(mine)
    others.sort(key=lambda e: (-int(e.get("score", 0)), -int(e.get("wave", 0))))
    return others[:10]


def _merge_story(entries: list, name: str, hit_rate: float, time_sec: int) -> list:
    name = (name or "AAA")[:8].upper()
    others = [e for e in entries if str(e.get("name", "")).upper() != name]
    row = {
        "name": name,
        "cleared_at": str(date.today()),
        "hit_rate": float(hit_rate),
        "time_sec": int(time_sec),
    }
    others.append(row)
    others.sort(
        key=lambda e: (
            -float(e.get("hit_rate", e.get("accuracy", 0))),
            int(e.get("time_sec", 999999999)),
        )
    )
    return others[:10]


def _trim_boss_leaderboard(entries: list, limit: int = 10) -> list:
    from collections import defaultdict

    buckets: dict[tuple, list] = defaultdict(list)
    for e in entries:
        key = (int(e.get("boss_id", 0)), str(e.get("difficulty", "")).lower())
        buckets[key].append(e)
    out: list = []
    for _key, items in buckets.items():
        items.sort(key=lambda x: float(x.get("time_sec", 9e9)))
        out.extend(items[:limit])
    return out


def _merge_boss(entries: list, name: str, boss_id: int, difficulty: str, time_sec: float) -> list:
    name = (name or "AAA")[:8].upper()
    bid = int(boss_id)
    diff = str(difficulty).lower()
    if diff not in ("easy", "normal", "hard", "expert"):
        raise ValueError("invalid difficulty")
    if bid < 1 or bid > 4:
        raise ValueError("invalid boss_id")
    others = [
        e
        for e in entries
        if not (
            str(e.get("name", "")).upper() == name
            and int(e.get("boss_id", 0)) == bid
            and str(e.get("difficulty", "")).lower() == diff
        )
    ]
    mine = next(
        (
            e
            for e in entries
            if str(e.get("name", "")).upper() == name
            and int(e.get("boss_id", 0)) == bid
            and str(e.get("difficulty", "")).lower() == diff
        ),
        None,
    )
    t = float(time_sec)
    if mine is None or float(mine.get("time_sec", 9e9)) > t:
        row = {
            "name": name,
            "boss_id": bid,
            "difficulty": diff,
            "time_sec": round(t, 2),
            "date": str(date.today()),
        }
        others.append(row)
    else:
        others.append(mine)
    return _trim_boss_leaderboard(others)


def post_ranking(path: Path, mode: str, body: dict) -> list:
    data = _load(path)
    if mode == "endless":
        name = body.get("name", "PLY")
        score = int(body.get("score", 0))
        wave = int(body.get("wave", 0))
        data["endless"] = _merge_endless(data.get("endless", []), name, score, wave)
    elif mode == "story":
        name = body.get("name", "PLY")
        hit_rate = float(body.get("hit_rate", body.get("accuracy", 0)))
        time_sec = int(body.get("time_sec", 0))
        data["story"] = _merge_story(data.get("story", []), name, hit_rate, time_sec)
    elif mode == "boss":
        name = body.get("name", "PLY")
        boss_id = int(body.get("boss_id", 0))
        difficulty = str(body.get("difficulty", "normal"))
        time_sec = float(body.get("time_sec", 9999))
        data["boss"] = _merge_boss(data.get("boss", []), name, boss_id, difficulty, time_sec)
    else:
        raise ValueError("invalid mode")
    _save(path, data)
    return data.get(mode, [])

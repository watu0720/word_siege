"""Achievements and save blob in saves.json."""
from __future__ import annotations

import json
import logging
from pathlib import Path

LOG = logging.getLogger(__name__)

DEFAULT_SAVES = {"achievements": []}


def _load(path: Path) -> dict:
    if not path.exists():
        return json.loads(json.dumps(DEFAULT_SAVES))
    try:
        raw = path.read_text(encoding="utf-8")
        data = json.loads(raw)
        if not isinstance(data, dict):
            raise ValueError("root must be object")
        if "achievements" not in data or not isinstance(data["achievements"], list):
            data["achievements"] = []
        return data
    except (json.JSONDecodeError, ValueError) as e:
        LOG.warning("saves.json corrupt, resetting: %s", e)
        return json.loads(json.dumps(DEFAULT_SAVES))


def _save(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def get_saves(path: Path) -> dict:
    return _load(path)


def unlock_achievement(path: Path, achievement_id: str) -> dict:
    data = _load(path)
    ids = [str(x) for x in data["achievements"]]
    if achievement_id not in ids:
        data["achievements"].append(achievement_id)
        _save(path, data)
    return data

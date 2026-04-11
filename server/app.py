"""WORD SIEGE Flask app: static client + JSON APIs."""
from __future__ import annotations

import csv
import logging
import os
import sys
import threading
import time
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory

from routes import ranking as ranking_routes
from routes import saves as saves_routes

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
CLIENT = ROOT / "client"
WORDS_CSV = DATA / "words.csv"

logging.basicConfig(level=logging.INFO)
LOG = logging.getLogger("word_siege")

app = Flask(__name__, static_folder=str(CLIENT), static_url_path="")

# Client sends /api/ping periodically; if it stops (tab closed), exit after idle.
_PING_LOCK = threading.Lock()
_LAST_PING: float = time.monotonic()
PING_IDLE_SEC = 25.0


def _touch_ping() -> None:
    global _LAST_PING
    with _PING_LOCK:
        _LAST_PING = time.monotonic()


def _watchdog_loop() -> None:
    while True:
        time.sleep(5.0)
        with _PING_LOCK:
            age = time.monotonic() - _LAST_PING
        if age > PING_IDLE_SEC:
            LOG.info("No ping for %.0fs — stopping server", age)
            os._exit(0)


def _schedule_exit() -> None:
    def _kill() -> None:
        time.sleep(0.2)
        os._exit(0)

    threading.Thread(target=_kill, daemon=True).start()


@app.route("/")
def index():
    return send_from_directory(CLIENT, "index.html")


@app.route("/api/health")
def health():
    _touch_ping()
    return jsonify({"ok": True})


@app.route("/api/ping", methods=["POST"])
def api_ping():
    _touch_ping()
    return jsonify({"ok": True})


@app.route("/api/shutdown", methods=["POST"])
def api_shutdown():
    LOG.info("Shutdown requested (browser)")
    _schedule_exit()
    return jsonify({"ok": True})


@app.route("/api/words")
def api_words():
    if not WORDS_CSV.is_file():
        return jsonify({"error": "words.csv not found", "code": "WORDS_MISSING"}), 404
    rows = []
    try:
        with WORDS_CSV.open(encoding="utf-8", newline="") as f:
            reader = csv.DictReader(f)
            if not reader.fieldnames or "word" not in reader.fieldnames:
                return jsonify({"error": "invalid csv header"}), 400
            for row in reader:
                w = (row.get("word") or "").strip()
                if not w:
                    continue
                cat = (row.get("length_category") or "short").strip().lower()
                rows.append({"word": w, "length_category": cat})
    except OSError as e:
        LOG.exception("read words")
        return jsonify({"error": str(e)}), 500
    if not rows:
        return jsonify({"error": "no words in csv"}), 400
    return jsonify({"words": rows})


@app.route("/api/ranking/<mode>", methods=["GET"])
def get_ranking(mode):
    if mode not in ("endless", "story"):
        return jsonify({"error": "invalid mode"}), 400
    path = DATA / "ranking.json"
    items = ranking_routes.get_ranking(path, mode)
    return jsonify({"mode": mode, "items": items})


@app.route("/api/ranking/<mode>", methods=["POST"])
def post_ranking(mode):
    if mode not in ("endless", "story"):
        return jsonify({"error": "invalid mode"}), 400
    body = request.get_json(silent=True) or {}
    try:
        path = DATA / "ranking.json"
        items = ranking_routes.post_ranking(path, mode, body)
        return jsonify({"mode": mode, "items": items})
    except (ValueError, TypeError, KeyError) as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/saves", methods=["GET"])
def get_saves():
    path = DATA / "saves.json"
    return jsonify(saves_routes.get_saves(path))


@app.route("/api/saves/achievement", methods=["POST"])
def post_achievement():
    body = request.get_json(silent=True) or {}
    aid = body.get("id")
    if not aid or not isinstance(aid, str):
        return jsonify({"error": "missing id"}), 400
    path = DATA / "saves.json"
    data = saves_routes.unlock_achievement(path, aid)
    return jsonify(data)


def main():
    port = 5000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass
    _touch_ping()
    threading.Thread(target=_watchdog_loop, daemon=True).start()
    LOG.info("Serving WORD SIEGE from %s on port %s", ROOT, port)
    app.run(host="127.0.0.1", port=port, debug=False, use_reloader=False)


if __name__ == "__main__":
    main()

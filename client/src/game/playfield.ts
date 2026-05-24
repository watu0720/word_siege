/** 固定プレイフィールド（論理座標）。ブラウザサイズに依存しない。 */
export const PLAYFIELD_WIDTH = 960;
export const PLAYFIELD_HEIGHT = 540;

/**
 * ストーリーモードの難易度: Weff = waveInStage + (stage - 1) × この値。
 * ステージが進むほど「同じ WAVE 番号」でも敵が強く・多くなる。
 */
export const STORY_STAGE_DIFFICULTY_OFFSET = 8;

/** 自機あたり判定（中心からの半径 px） */
export const PLAYER_HIT_RADIUS = 26;
/** 敵弾あたり判定半径 px */
export const ENEMY_BULLET_HIT_RADIUS = 16;
/** boss1 特殊弾（大きめ） */
export const BOSS_BURGER_BULLET_HIT_RADIUS = 24;

/** 左端より外に出た敵は消滅（ダメージなし） */
export const MONSTER_DESPAWN_X = -60;

import * as types from '../../lib/constants/actionTypes';

interface AddSecondsAction {
    type: types.ADD_SECONDS
}

export const addSeconds = (): AddSecondsAction => ({
    type: types.ADD_SECONDS,
});

interface AddScoreAction {
    score: number,
    type: types.ADD_SCORE
}

export const addScore = (score: number): AddScoreAction => ({
    score: score,
    type: types.ADD_SCORE,
});

interface NewGameAction {
    type: types.NEW_GAME
}

export const newGame = (): NewGameAction => ({
    type: types.NEW_GAME
});

interface PauseGameAction {
    isModalShow: boolean,
    type: types.PAUSE_GAME
}

export const pauseGame = (isModalShow: boolean): PauseGameAction => ({
    isModalShow: isModalShow,
    type: types.PAUSE_GAME
});

export type gameAction = AddSecondsAction | AddScoreAction | PauseGameAction | NewGameAction;
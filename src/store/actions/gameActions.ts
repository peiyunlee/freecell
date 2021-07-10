import * as types from '../../lib/constants/actionTypes';

interface AddSecondsAction {
    type: types.ADD_SECONDS
}

export const addSeconds = (): AddSecondsAction => ({
    type: types.ADD_SECONDS,
});

interface SetScoreAction {
    score: number,
    type: types.SET_SCORE
}

export const setScore = (score: number): SetScoreAction => ({
    score: score,
    type: types.SET_SCORE,
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

export type gameAction = AddSecondsAction | SetScoreAction | PauseGameAction | NewGameAction;
import * as types from '../../lib/constants/actionTypes';
import PokerCard from '../../lib/PokerCard';

interface SetQuestionLayoutAction {
    questionLayout: PokerCard[][];
    type: types.SET_QUESTIONLAYOUT;
}

export const setQuestionLayout = (questionLayout: PokerCard[][]): SetQuestionLayoutAction => ({
    questionLayout: questionLayout,
    type: types.SET_QUESTIONLAYOUT,
});

interface SetTempLayoutAction {
    tempLayout: (PokerCard | null)[];
    type: types.SET_TEMPLAYOUT;
}

export const setTempLayout = (tempLayout: (PokerCard | null)[]): SetTempLayoutAction => ({
    tempLayout: tempLayout,
    type: types.SET_TEMPLAYOUT,
});

interface SetOverLayoutAction {
    overLayout: PokerCard[][];
    type: types.SET_OVERLAYOUT;
}

export const setOverLayout = (overLayout: PokerCard[][]): SetOverLayoutAction => ({
    overLayout: overLayout,
    type: types.SET_OVERLAYOUT,
});

interface NewLayoutAction {
    type: types.NEW_LAYOUT;
}

export const newLayout = (): NewLayoutAction => ({
    type: types.NEW_LAYOUT,
});

interface RestartLayoutAction {
    type: types.RESTART_LAYOUT;
}

export const restartLayout = (): RestartLayoutAction => ({
    type: types.RESTART_LAYOUT,
});

export type cardAction = SetQuestionLayoutAction | SetTempLayoutAction | SetOverLayoutAction | NewLayoutAction | RestartLayoutAction;
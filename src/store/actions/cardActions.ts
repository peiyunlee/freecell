import * as types from '../../lib/constants/actionTypes';
import PokerCard from '../../lib/PokerCard';

interface SetQuestionLayoutAction {
    questionLayout: PokerCard[][];
    type: types.SET_QUESTIONLAYOUT;
}

interface SetTempLayoutAction {
    tempLayout: (PokerCard | null)[];
    type: types.SET_TEMPLAYOUT;
}

interface SetOverLayoutAction {
    overLayout: PokerCard[][];
    type: types.SET_OVERLAYOUT;
}

export const setQuestionLayout = (questionLayout: PokerCard[][]): SetQuestionLayoutAction => ({
    questionLayout: questionLayout,
    type: types.SET_QUESTIONLAYOUT,
});

export const setTempLayout = (tempLayout: (PokerCard | null)[]): SetTempLayoutAction => ({
    tempLayout: tempLayout,
    type: types.SET_TEMPLAYOUT,
});

export const setOverLayout = (overLayout: PokerCard[][]): SetOverLayoutAction => ({
    overLayout: overLayout,
    type: types.SET_OVERLAYOUT,
});

export type cardAction = SetQuestionLayoutAction | SetTempLayoutAction | SetOverLayoutAction;
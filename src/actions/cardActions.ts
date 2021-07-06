import * as types from '../constants/actionTypes';

interface SetQuestionLayoutAction {
    questionLayout: string[][];
    type: types.SET_QUESTIONLAYOUT;
}

interface SetTempLayoutAction {
    tempLayout: string[];
    type: types.SET_TEMPLAYOUT;
}

interface SetOverLayoutAction {
    overLayout: string[][];
    type: types.SET_OVERLAYOUT;
}

export const setQuestionLayout = (questionLayout: string[][]): SetQuestionLayoutAction => ({
    questionLayout: questionLayout,
    type: types.SET_QUESTIONLAYOUT,
});

export const setTempLayout = (tempLayout: string[]): SetTempLayoutAction => ({
    tempLayout: tempLayout,
    type: types.SET_TEMPLAYOUT,
});

export const setOverLayout = (overLayout: string[][]): SetOverLayoutAction => ({
    overLayout: overLayout,
    type: types.SET_OVERLAYOUT,
});

export type cardAction = SetQuestionLayoutAction | SetTempLayoutAction | SetOverLayoutAction;
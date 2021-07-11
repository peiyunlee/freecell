import * as types from '../../lib/constants/actionTypes';
import Step from '../../lib/interface/MoveStep';
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

interface UndoStepCountAction {
    type: types.UNDO_STEPCOUNT
}

export const UndoStepCount = (): UndoStepCountAction => ({
    type: types.UNDO_STEPCOUNT,
});

interface UndoStepAction {
    type: types.UNDO_STEP
}

export const UndoStep = (): UndoStepAction => ({
    type: types.UNDO_STEP,
});

interface AddStepAction {
    step: Step,
    type: types.ADD_STEP
}

export const AddStep = (step: Step): AddStepAction => ({
    step: step,
    type: types.ADD_STEP,
});

export type cardAction = AddStepAction | UndoStepAction | UndoStepCountAction | SetQuestionLayoutAction | SetTempLayoutAction | SetOverLayoutAction | NewLayoutAction | RestartLayoutAction;
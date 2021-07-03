import * as types from '../constants/actionTypes';
import { IQuestion } from '../assets/question'

interface ISetQuestionAction {
    payload: IQuestion;
    type: types.SET_QUESTION;
}

export const setQuestion = () => ({
    type: types.SET_QUESTION,
});

export type cardAction = ISetQuestionAction;
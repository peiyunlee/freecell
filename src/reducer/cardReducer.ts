import { questions, IQuestion } from '../assets/question'
import * as types from '../constants/actionTypes';
import { cardAction } from '../actions/cardActions'

const initialState: IQuestion = {
    question: questions[0],
}

const cardReducer = (state = initialState, action: cardAction) => {
    switch (action.type) {
        case types.SET_QUESTION:
            return {
                question: questions[1],
            };
            break;
        default:
            return state;
            break;
    };
}

export default cardReducer;
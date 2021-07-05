import { questions } from '../assets/question'
import * as types from '../constants/actionTypes';
import { cardAction } from '../actions/cardActions'

interface StoreState {
    questionLayout: Array<Array<string>>,
    tempLayout: Array<Array<string>>,
    overLayout: Array<Array<string>>,
}

const initialState: StoreState = {
    questionLayout: questions[0],
    tempLayout: [[], [], [], []],
    overLayout: [[], [], [], []],
};

const cardReducer = (state = initialState, action: cardAction): StoreState => {
    switch (action.type) {
        case types.SET_QUESTIONLAYOUT:
            return {
                ...state,
                questionLayout: [
                    ...action.questionLayout,
                ],
            }
            break;
        case types.SET_TEMPLAYOUT:
            return {
                ...state,
                tempLayout: [
                    ...action.tempLayout,
                ],
            }
            break;
        case types.SET_OVERLAYOUT:
            return {
                ...state,
                overLayout: [
                    ...action.overLayout,
                ],
            }
            break;
        default:
            return state;
            break;
    };
}

export default cardReducer;
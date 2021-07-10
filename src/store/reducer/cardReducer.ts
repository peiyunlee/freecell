import { questions } from '../../assets/question'
import * as types from '../../lib/constants/actionTypes';
import { cardAction } from '../actions/cardActions'
import PokerCard from '../../lib/PokerCard'

interface CardState {
    questionLayoutIndex: number,
    questionLayout: PokerCard[][],
    tempLayout: Array<PokerCard | null>,
    overLayout: PokerCard[][],
}

function questionsNewPokerCardInstance(questions: string[][]) {
    let result: PokerCard[][] = [];
    questions.forEach((item, i) => {
        result.push([])
        item.forEach((item, j) => {
            result[i][j] = new PokerCard(item, 'QuestionLayout', i)
        })
    })
    return result;
}

const initialState: CardState = {
    questionLayoutIndex: 0,
    questionLayout: questionsNewPokerCardInstance(questions[0]),
    tempLayout: [null, null, null, null],
    overLayout: [[], [], [], []],
};

const cardReducer = (state = initialState, action: cardAction): CardState => {
    switch (action.type) {
        case types.SET_QUESTIONLAYOUT:
            return {
                ...state,
                questionLayout: [
                    ...action.questionLayout,
                ],
            }
        case types.SET_TEMPLAYOUT:
            return {
                ...state,
                tempLayout: [
                    ...action.tempLayout,
                ],
            }
        case types.SET_OVERLAYOUT:
            return {
                ...state,
                overLayout: [
                    ...action.overLayout,
                ],
            }
        case types.NEW_LAYOUT:
            let index = 0;
            if (state.questionLayoutIndex == 0) index = 1;
            return {
                questionLayoutIndex: index,
                questionLayout: questionsNewPokerCardInstance(questions[index]),
                tempLayout: [null, null, null, null],
                overLayout: [[], [], [], []],
            }
        case types.RESTART_LAYOUT:
            return {
                ...state,
                questionLayout: [
                    ...questionsNewPokerCardInstance(questions[state.questionLayoutIndex])],
                tempLayout: [null, null, null, null],
                overLayout: [[], [], [], []],
            }
        default:
            return state;
    };
}

export default cardReducer;
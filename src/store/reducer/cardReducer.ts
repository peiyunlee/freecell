import { questions } from '../../assets/question'
import * as types from '../../lib/constants/actionTypes';
import { cardAction } from '../actions/cardActions'
import PokerCard from '../../lib/PokerCard'
import Step from '../../lib/interface/MoveStep'
import { copyObjectProperties } from '../../lib/copyObject';

interface CardState {
    questionLayoutIndex: number,
    questionLayout: PokerCard[][],
    tempLayout: Array<PokerCard | null>,
    overLayout: PokerCard[][],
    steps: Step[],
    stepCount: number,
}

function questionsNewPokerCardInstance(questions: string[][]) {
    var result: PokerCard[][] = [];
    questions.forEach((item, i) => {
        result.push([])
        item.forEach((item, j) => {
            result[i][j] = new PokerCard(item, 'QuestionLayout', i)
        })
    })
    return result;
}

const initialStep: Step = {
    resultIndex: 0,
    from: '',
    to: '',
    fromIndex: 0,
    toIndex: 0,
};

const initialState: CardState = {
    questionLayoutIndex: 0,
    questionLayout: questionsNewPokerCardInstance(questions[0]),
    tempLayout: [null, null, null, null],
    overLayout: [[], [], [], []],
    stepCount: 0,
    steps: [],
};


const cardReducer = (state = initialState, action: cardAction): CardState => {
    switch (action.type) {
        case types.UNDO_STEPCOUNT:
            return {
                ...state,
                stepCount: state.stepCount - 1,
            }
        case types.UNDO_STEP:
            state.steps.pop();
            return {
                ...state,
                steps: [...state.steps],
            }
        case types.ADD_STEP:
            state.steps.push(action.step);
            return {
                ...state,
                stepCount: state.stepCount + 1,
                steps: [...state.steps],
            }
        case types.SET_QUESTIONLAYOUT:
            return {
                ...state,
                questionLayout: [...action.questionLayout,],
            }
        case types.SET_TEMPLAYOUT:
            return {
                ...state,
                tempLayout: [...action.tempLayout,],
            }
        case types.SET_OVERLAYOUT:
            return {
                ...state,
                overLayout: [...action.overLayout,],
            }
        case types.NEW_LAYOUT:
            var index = 0;
            if (state.questionLayoutIndex == 0) index = 1;
            return {
                stepCount: 0,
                questionLayoutIndex: index,
                questionLayout: questionsNewPokerCardInstance(questions[index]),
                tempLayout: [null, null, null, null],
                overLayout: [[], [], [], []],
                steps: []
            }
        case types.RESTART_LAYOUT:
            return {
                ...state,
                questionLayout: questionsNewPokerCardInstance(questions[state.questionLayoutIndex]),
                tempLayout: [null, null, null, null],
                overLayout: [[], [], [], []],
                stepCount: 0,
                steps: []
            }
        default:
            return state;
    };
}

export default cardReducer;
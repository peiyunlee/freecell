import * as types from '../../lib/constants/actionTypes';
import { gameAction } from '../actions/gameActions'

interface GameState {
    seconds: number,
    score: number,
    isModalShow: boolean,
}

const initialState: GameState = {
    seconds: 0,
    score: 0,
    isModalShow: false,
};

const gameReducer = (state = initialState, action: gameAction): GameState => {
    switch (action.type) {
        case types.ADD_SECONDS:
            return {
                ...state,
                seconds: state.seconds + (state.isModalShow ? 0 : 1),
            }
        case types.ADD_SCORE:
            return {
                ...state,
                score: state.score + action.score,
            }
        case types.NEW_GAME:
            return initialState;
        case types.PAUSE_GAME:
            return {
                ...state,
                isModalShow: action.isModalShow,
            }
        default:
            return state;
    };
}

export default gameReducer;
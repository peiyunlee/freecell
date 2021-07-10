import { createStore, combineReducers } from "redux";
import cardReducer from './reducer/cardReducer';
import gameReducer from './reducer/gameReducer';

const rootReducer = combineReducers({
    cardReducer,
    gameReducer,
});

const rootStore = createStore(rootReducer);

export type storeTypes = ReturnType<typeof rootReducer>;

export default rootStore;
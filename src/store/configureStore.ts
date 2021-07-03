import { createStore, combineReducers } from "redux";
import cardReducer from '../reducer/cardReducer';

const rootReducer = combineReducers({
    cardReducer,
});

const store = createStore(rootReducer);

export type storeTypes = ReturnType<typeof rootReducer>;

export default store;
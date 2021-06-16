import playReducer from './play-reducer';
import { combineReducers } from 'redux';

const allReducers = {
    playReducer: playReducer
}

let rootReducer = combineReducers(allReducers);

export default rootReducer;

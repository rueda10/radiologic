import { combineReducers } from 'redux';
import questions from './questions_reducer';
import current from './current_reducer';

export default combineReducers({
    questions,
    current
});
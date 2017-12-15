import { combineReducers } from 'redux';
import questions from './questions_reducer';
import current from './current_reducer';
import language from './language_reducer';

export default combineReducers({
    questions,
    current,
    language
});
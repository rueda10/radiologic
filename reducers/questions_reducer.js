import questions from './questions';

export default function(state = initialState, action) {
    switch(action.type) {
        case 'GET_QUESTIONS':
        default: {
            return state;
        }
    }
}

const initialState = questions;


export default function(state = {}, action) {
    switch(action.type) {
        case 'SET_CURRENT': {
            return action.payload;
        }
        default: {
            return {};
        }
    }
}
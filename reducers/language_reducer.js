export default function(state = 0, action) {
    switch(action.type) {
        case 'SET_LANGUAGE': {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}
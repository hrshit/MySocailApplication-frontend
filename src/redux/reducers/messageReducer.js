import { GET_MESSAGES, ERROR, FETCHING } from "../actions/messageAction";

const defaultState = {
    isFetching: false,
    messages: [],
    errorMessage: '',
};

const messageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_MESSAGES: {
            return {
                ...state,
                isFetching: false,
                messages: action.payload.messages,
                errorMessage: '',
            }
        }
        case FETCHING: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case ERROR: {
            return {
                ...state,
                errorMessage: action.payload,
                isFetching: false
            }
        }
        default:
            return state;
    }
}

export default messageReducer;
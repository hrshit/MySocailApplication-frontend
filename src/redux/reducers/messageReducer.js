import { CREATE_MESSAGE, GET_MESSAGES, ERROR, FETCHING, LIKE_MESSAGE, DELETE_MESSAGE } from "../actions/messageAction";

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
                messages: action.payload.results,
                errorMessage: '',
            }
        }
        case CREATE_MESSAGE: {
            return {
                ...state,
                isFetching: false,
                errorMessage: '',
            }
        }
        case LIKE_MESSAGE: {
            return {
                ...state,
                isFetching: false,
                errorMessage: '',
            }
        }
        case DELETE_MESSAGE: {
            return {
                ...state,
                isFetching: false,
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
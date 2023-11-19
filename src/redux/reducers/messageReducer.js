import { CREATE_MESSAGE, GET_MESSAGES, ERROR, FETCH, LIKE_MESSAGE, DELETE_MESSAGE, CLEAR_MESSAGE, UPDATE_MESSAGE } from "../actions/messageAction";

const defaultState = {
    isFetching: false,
    messages: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
    errorMessage: '',
};

const messageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_MESSAGES: {
            return {
                ...state,
                isFetching: false,
                messages: [...state.messages, ...action.payload.results],
                page: action.payload.page,
                limit: action.payload.limit,
                totalPages: action.payload.totalPages,
                totalResults: action.payload.totalResults,
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
        case CLEAR_MESSAGE: {
            return {
                ...state,
                messages: []
            }
        }
        case LIKE_MESSAGE: {
            return {
                ...state,
                isFetching: false,
                errorMessage: '',
                messages: state.messages.map((message) => {
                    if (message.id == action.payload.id) {
                        message.likes = action.payload.likes
                    }
                    return message;
                })
            }
        }
        case DELETE_MESSAGE: {
            console.log("this is running", action.payload);
            return {
                ...state,
                isFetching: false,
                messages: state.messages.filter((message) => {
                    if (message.id !== action.payload) {
                        return message;
                    }
                }),
                errorMessage: '',
            }
        }
        case UPDATE_MESSAGE: {
            return {
                ...state,
                isFetching: false,
                messages: state.messages.map((message) => {
                    if (message.id == action.payload.id) {
                        message.content = action.payload.content
                    }
                    return message;
                }),
                errorMessage: '',
            }
        }
        case FETCH: {
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
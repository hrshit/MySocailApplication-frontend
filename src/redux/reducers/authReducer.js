import { LOGIN, REGISTER, FETCHING, ERROR, LOGOUT } from "../actions/authActions.js"

const defaultState = {
    isFetching: false,
    isLoggedIn: false,
    tokens: {},
    loggedInUser: {},
    errorMessage: {},
};

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                isFetching: false,
                isLoggedIn: true,
                tokens: action.payload.tokens,
                loggedInUser: action.payload.user,
                errorMessage: {},
            }
        }
        case REGISTER: {
            return {
                ...state,
                isFetching: false,
                isLoggedIn: true,
                tokens: action.payload.tokens,
                loggedInUser: action.payload.user,
                errorMessage: {},
            }
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                isFetching: false,
                tokens: {},
                loggedInUser: {},
                errorMessage: {},
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
};

export default authReducer;
import { LOGIN, REGISTER, FETCHING } from "../actions/authActions.js"

const defaultState = {
    isFetching: false,
    isLoggedIn: false,
    tokens: {},
    loggedInUser: {}
};

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                isFetching: false,
                isLoggedIn: true,
                tokens: action.payload.tokens,
                loggedInUser: action.payload.user
            }
        }
        case REGISTER: {
            return {
                ...state,
                isFetching: false,
                isLoggedIn: true,
                tokens: action.payload.tokens,
                loggedInUser: action.payload.user
            }
        }
        case FETCHING: {
            return {
                ...state,
                isFetching: true,
            }
        }
        default:
            return state;
    }
};

export default authReducer;
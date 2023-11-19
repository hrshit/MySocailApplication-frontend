import { GET_NOTIFICATIONS, FETCH_NOTOFICATIONS, ERROR_NOTIFICATIONS } from "../actions/notificationActions";

const defaultState = {
    notifications: [],
    isFetching: false,
    errorMessages: ''
};

const notificationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_NOTIFICATIONS: {
            return {
                ...state,
                notifications: action.payload.results,
                isFetching: false,
                errorMessages: ''
            }
        }
        case FETCH_NOTOFICATIONS: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case ERROR_NOTIFICATIONS: {
            return {
                ...state,
                errorMessages: action.payload,
            }
        }
        default:
            return state
    }
}
export default notificationReducer;


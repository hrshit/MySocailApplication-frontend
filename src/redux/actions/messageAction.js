import { getMessages } from "../../api/message";

export const GET_MESSAGES = "GET_MESSAGES";
export const FETCHING = "FETCHING";
export const ERROR = "ERROR";


export const getMessagesAction = (params, authToken) => async dispatch => {
    console.log("from get messageAction ", params, authToken);
    dispatch({
        type: FETCHING
    });
    try {
        const response = await getMessages(params, authToken);
        console.log("response from messsageapi", response);
        if (!(response.results)) throw response;
        dispatch({
            type: GET_MESSAGES,
            payload: response,
        })
    }
    catch (err) {
        dispatch(foundError(err.message));
    }
}

export const foundError = (message) => {
    return {
        type: ERROR,
        payload: message
    }
}
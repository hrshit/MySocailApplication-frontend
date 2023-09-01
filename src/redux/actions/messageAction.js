import { getMessages, likeMessage, createMessage } from "../../api/message";

export const CREATE_MESSAGE = "CREATE_MESSAGES";
export const GET_MESSAGES = "GET_MESSAGES";
export const LIKE_MESSAGE = "LIKE_MESSAGE";
export const FETCHING = "FETCHING";
export const ERROR = "ERROR";


export const getMessagesAction = (params, authToken) => async dispatch => {
    console.log("Hello i am running  ", params, authToken);
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

export const likeMessageAction = (msgId, authToken) => async dispatch => {
    console.log("from likemessage ", authToken, msgId);
    dispatch({
        type: FETCHING
    });
    try {
        const response = await likeMessage(msgId, authToken);
        console.log("response from likemessage ", response);
        if (!(response.results)) throw response;
        dispatch({
            type: LIKE_MESSAGE,
        });
    }
    catch (err) {
        dispatch(foundError(err.message));
    }
}
export const createMessageAction = (messageBody, authToken) => async dispatch => {
    dispatch({
        type: FETCHING
    });
    try {
        const response = await createMessage(messageBody, authToken);
        console.log("response from createmessage ", response);
        if (!(response.results)) throw response;
        dispatch({
            type: CREATE_MESSAGE,
        });
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
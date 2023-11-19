import { getMessages, likeMessage, createMessage, deleteMessage, updateMessage } from "../../api/message";

export const CREATE_MESSAGE = "CREATE_MESSAGES";
export const GET_MESSAGES = "GET_MESSAGES";
export const LIKE_MESSAGE = "LIKE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";
export const FETCH = "FETCH";
export const ERROR = "ERROR";


export const getMessagesAction = (params, authToken) => async dispatch => {
    console.log("1 action is running");
    dispatch({
        type: FETCH
    });
    try {
        const response = await getMessages(params, authToken);
        console.log("response from messsageapi", response);
        if (!(response.results)) throw response;
        if (response.page == 1)
            dispatch({ type: CLEAR_MESSAGE });
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
    console.log(msgId);
    dispatch({
        type: FETCH
    });
    try {
        const response = await likeMessage(msgId, authToken);
        if (!(response)) throw response;
        console.log("response from likemessage ", response);
        dispatch({
            type: LIKE_MESSAGE,
            payload: response,
        });
    }
    catch (err) {
        dispatch(foundError(err.message));
    }
}
export const deleteMessageAction = (msgId, authToken) => async dispatch => {
    console.log("3");
    dispatch({
        type: FETCH
    });
    try {
        const response = await deleteMessage(msgId, authToken);
        console.log("response from DEletemessage ", response);
        if ((response)) throw response;
        dispatch({
            type: DELETE_MESSAGE,
            payload: msgId
        });
    }
    catch (err) {
        dispatch(foundError(err.message));
    }
}
export const updateMessageAction = (msgId, messageBody, authToken) => async dispatch => {
    console.log("4");
    dispatch({
        type: FETCH
    });
    try {
        const response = await updateMessage(msgId, messageBody, authToken);
        console.log("response from updateMessage ", response);
        if (!(response)) throw response;
        dispatch({
            type: UPDATE_MESSAGE,
            payload: response,
        });
    }
    catch (err) {
        dispatch(foundError(err.message));
    }
}
export const createMessageAction = (messageBody, authToken) => async dispatch => {
    console.log("5");
    dispatch({
        type: FETCH
    });
    try {
        const response = await createMessage(messageBody, authToken);
        if (!(response.results)) throw response;
        dispatch({
            type: CREATE_MESSAGE,
            payload: response,
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
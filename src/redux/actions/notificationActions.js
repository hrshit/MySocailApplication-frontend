import { getNotifications } from "../../api/notification";

export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
export const FETCH_NOTOFICATIONS = "FETCH_NOTOFICATIONS";
export const ERROR_NOTIFICATIONS = "ERROR_NOTIFICATIONS";


export const getNotificationAction = (params, authToken) => async dispatch => {
    console.log("response from Notification", params, authToken);
    dispatch({
        type: FETCH_NOTOFICATIONS
    });
    try {
        const response = await getNotifications(params, authToken);
        console.log("here is the response", response);
        if (!(response.results)) throw response;
        console.log("result from notification api", response.results);
        dispatch({
            type: GET_NOTIFICATIONS,
            payload: response,
        })
    }
    catch (err) {
        dispatch(findError(err.message));
    }
}

export const findError = (message) => {
    return {
        type: ERROR_NOTIFICATIONS,
        payload: message
    }
}
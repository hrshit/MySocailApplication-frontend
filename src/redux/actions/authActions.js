import { register, login } from "../../api/auth";

export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const FETCHING = "FETCHING";
export const ERROR = "ERROR";

export const registerAction = (registerBody) => async dispatch => {
    console.log("from register action ", registerBody);
    dispatch({
        type: FETCHING
    });
    try {
        const response = await register(registerBody);
        if (!(response.code == 200)) throw response;
        dispatch({
            type: REGISTER,
            payload: response,
        })
    }
    catch (err) {
        dispatch(foundError(err.message));
    }
}

export const loginAction = (loginBody) => async dispatch => {
    console.log("form login action ", loginBody);
    dispatch({
        type: FETCHING
    });
    try {
        const response = await login(loginBody);
        if (!(response.code == 200)) throw response;
        dispatch({
            type: LOGIN,
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
import { register, login } from "../../api/auth";

export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const FETCHING = "FETCHING";

export const registerAction = (registerBody) => async dispatch => {
    console.log("from register action ", registerBody);
    dispatch({
        type: FETCHING
    });
    const response = await register(registerBody);
    console.log("response from the api", response);
    dispatch({
        type: REGISTER,
        payload: response,
    })
}

export const loginAction = (loginBody) => async dispatch => {
    console.log("form login action ", loginBody);
    dispatch({
        type: FETCHING
    });
    const response = await login(loginBody);
    console.log("response from the api", response);
    dispatch({
        type: LOGIN,
        payload: response,
    })
}
export const register = async (registerBody) => {
    const apiResponse = await fetch('http://127.0.0.1:3000/v1/auth/register',
        {
            method: 'POST',
            body: JSON.stringify(registerBody),
            headers: { 'Content-type': 'application/json; charset=UTF-8', },
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => { console.log(err.message); });

    return apiResponse;
}

export const login = async (loginBody) => {
    const apiResponse = await fetch('http://127.0.0.1:3000/v1/auth/login',
        {
            method: 'POST',
            body: JSON.stringify(loginBody),
            headers: { 'Content-type': 'application/json; charset=UTF-8', },
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => { console.log(err.message); });

    return apiResponse;
}
export const logout = async (refreshToken) => {
    const apiResponse = await fetch('http://127.0.0.1:3000/v1/auth/logout',
        {
            method: 'POST',
            body: JSON.stringify(refreshToken),
            headers: { 'Content-type': 'application/json; charset=UTF-8', },
        })
        .then((response) => {
            console.log("logout Suceesfull");
            return response;
        })
        .catch((err) => { console.log(err, err.message); });

    return apiResponse;
}
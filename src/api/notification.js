export const getNotifications = async (params, authToken) => {
    console.log("notification api is running ",)
    const apiResponse = await fetch('http://127.0.0.1:3000/v1/notifications' + params,
        {
            method: 'GET',
            headers: { 'Content-type': 'application/json; charset=UTF-8', 'Authorization': "Bearer " + authToken },
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => { console.log(err.message); });

    return apiResponse;
}
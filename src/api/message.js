export const getMessages = async (params, authToken) => {
    const apiResponse = await fetch('http://127.0.0.1:3000/v1/messages',
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

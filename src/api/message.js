export const getMessages = async (params, authToken) => {
    const apiResponse = await fetch('http://127.0.0.1:3000/v1/messages' + params,
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

export const likeMessage = async (msgId, authToken) => {
    const apiResponse = await fetch('http://127.0.0.1:3000/v1/messages/like/' + msgId,
        {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json; charset=UTF-8', 'Authorization': "Bearer " + authToken },
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => { console.log(err.message); });

    return apiResponse;
}

export const deleteMessage = async (msgId, authToken) => {
    const apiResponse = await fetch('http://127.0.0.1:3000/v1/messages/' + msgId,
        {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json; charset=UTF-8', 'Authorization': "Bearer " + authToken },
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => { console.log(err.message); });

    return apiResponse;
}
export const updateMessage = async (msgId, messageBody, authToken) => {
    const apiResponse = await fetch('http://127.0.0.1:3000/v1/messages/' + msgId,
        {
            method: 'PATCH',
            body: JSON.stringify(messageBody),
            headers: { 'Content-type': 'application/json; charset=UTF-8', 'Authorization': "Bearer " + authToken },
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => { console.log(err.message); });

    return apiResponse;
}

export const createMessage = async (messageBody, authToken) => {
    const apiResponse = await fetch('http://127.0.0.1:3000/v1/messages',
        {
            method: 'POST',
            body: JSON.stringify(messageBody),
            headers: { 'Content-type': 'application/json; charset=UTF-8', 'Authorization': "Bearer " + authToken },
        })
        .then((response) => {
            console.log("MESSAGE response", response);
            return response;
        })
        .catch((err) => { console.log(err.message); });
    return apiResponse;
}


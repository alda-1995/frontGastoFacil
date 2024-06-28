const listMessage = function (errorData) {
    let mensajes = "";
    Object.keys(errorData).forEach(key => {
        mensajes += `${errorData[key]}\n`;
    });
    return mensajes;
}

const getMessageErrors = function (response) {
    let errorMessage = "";
    switch (response.status) {
        case 400:
            errorMessage = listMessage(response.data.error);
            break;
        case 401:
            errorMessage = response.data.message;
            break;
        case 500:
            errorMessage = response.data.error;
            break;
        default:
            errorMessage = "Ocurrio al intentar, vuelve a intentarlo."
            break;
    }
    return errorMessage;
}

export default getMessageErrors;
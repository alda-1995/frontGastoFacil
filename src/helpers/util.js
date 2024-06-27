const getMessageErrors = function(errorData){
    let mensajes = "";
    Object.keys(errorData).forEach(key => {
        mensajes += `${errorData[key]}\n`;
    });
    return mensajes;
}

export default getMessageErrors;
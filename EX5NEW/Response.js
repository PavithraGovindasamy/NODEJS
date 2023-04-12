const httpResponseFileNotFound = (msg = "", data = 0) => {

    return {
        status: 404,
        data: data,
        code: msg
    }
}

const httpResponseData = (msg = "", data = 0) => {
    return {
        status: 201,
        code: msg
    }
}
const httpResponseNotFound = (msg = "", data = 0) => {
    return {
        status: 400,
        data: "",
        code: msg
    }
}

const httpSuccess = (msg = "", data = 0) => {
    return {
        status: 200,
        data:data,
        code: msg
    }
}





module.exports = {
    httpResponseFileNotFound, httpResponseData, httpResponseNotFound, httpSuccess
}



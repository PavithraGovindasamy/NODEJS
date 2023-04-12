const { response } = require('express');
let fs = require('fs');
const { readFile } = require('../utilities/Utilities');
const { writeFile } = require('../utilities/Utilities')
const constant=require("../constant/const.js");
const responseFile=require("../Response")
// create user
let createServices = async (data) => {
    try {

        let fileData = await readFile('cdw_ace23_buddies.json');
        const result = fileData.some(item => item.employeeId === data.employeeId);
        if (result) {
            return responseFile.httpResponseNotFound(constant.CONSTANT_MESSAGES.NOT_FOUND);
        }
        else {
            fileData.push(data);
            await writeFile('cdw_ace23_buddies.json', fileData);
            return responseFile.httpResponseData(constant.CONSTANT_MESSAGES.APPENDED);
        }
    }
    catch (error) {
            return responseFile.httpResponseFileNotFound(constant.CONSTANT_MESSAGES.FILE_NOT_FOUND);
    }
}


// delete user
const deleteAllServices = async (data) => {
    try {
        let fileData = await readFile('cdw_ace23_buddies.json');
        if (fileData.length == 0) {
            return responseFile.httpResponseData( constant.CONSTANT_MESSAGES.DELETE_MESSAGE);
        }
        else {
            fileData.push(data);
            fileData.splice(0);
            await writeFile('cdw_ace23_buddies.json', fileData);
            return responseFile.httpSuccess(constant.CONSTANT_MESSAGES.ALL_DATA_DELETE);
        }
    }
    catch (error) {
        return responseFile.httpResponseFileNotFound(constant.CONSTANT_MESSAGES.FILE_NOT_FOUND);

    }
}

const deleteServices = async (data) => {
    try {
        let fileData = await readFile('cdw_ace23_buddies.json');
        if (fileData.length == 0) {
            return responseFile.httpResponseData(constant.CONSTANT_MESSAGES.DELETE_MESSAGE);
        }
        else {
            let fileData1 = fileData.filter(obj => !(obj.employeeId == data.params.id));
            console.log(fileData1);
            if (fileData1.length == fileData.length) {
                return responseFile.httpResponseData(constant.CONSTANT_MESSAGES.BUDDY_NOT_FOUND);
            }
            else {
                await writeFile('cdw_ace23_buddies.json', fileData1);
                return responseFile.httpSuccess( constant.CONSTANT_MESSAGES.DELETE_USER );
            }
        }
    }
    catch (error) {
        return responseFile.httpResponseFileNotFound(constant.CONSTANT_MESSAGES.FILE_NOT_FOUND);

    }
}
// update user
const updateServices = async (data) => {
    try {
        let fileData = await readFile('cdw_ace23_buddies.json');
        let filteredData = fileData.filter(obj => obj.employeeId == data.params.id);
        if (filteredData.length == 0) {
            return responseFile.httpResponseData(constant.CONSTANT_MESSAGES.DELETE_MESSAGE);
        } else {
            fileData = fileData.filter(obj => obj.employeeId != data.params.id);
            fileData.push(data.body);
            await writeFile('cdw_ace23_buddies.json', fileData);
                return responseFile.httpSuccess(constant.CONSTANT_MESSAGES.UPDATED_USER,"");
        }
    }
    catch (error) {
        return responseFile.httpResponseFileNotFound(constant.CONSTANT_MESSAGES.FILE_NOT_FOUND);

    }

}
// read user
const readServices = async () => {
    try {
        let fileData = await readFile('cdw_ace23_buddies.json');
        return responseFile.httpSuccess("READ USER",fileData);
    }
    catch (error) {
        return responseFile.httpResponseFileNotFound(constant.CONSTANT_MESSAGES.FILE_NOT_FOUND);

    }
}

const fetchServices = async (data, id) => {
    try {
        let fileData = await readFile('cdw_ace23_buddies.json');
        fileData.push(data);
        let filteredData = fileData.filter(obj => obj.employeeId == id);
        if (filteredData.length == 0) {
            return responseFile.httpResponseData(constant.CONSTANT_MESSAGES.DELETE_MESSAGE);

        } else {
            return responseFile.httpSuccess("",filteredData[0]);
        }
    }
    catch (error) {
        return responseFile.httpResponseFileNotFound(constant.CONSTANT_MESSAGES.FILE_NOT_FOUND);

    }

}

module.exports = { createServices, fetchServices, readServices, updateServices, deleteServices, deleteAllServices };



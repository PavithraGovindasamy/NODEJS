const { response } = require('express');
let fs = require('fs');
const { readFile } = require('../utilities/Utilities');
const { writeFile } = require('../utilities/Utilities')
// create user
let createServices = async (data) => {
    try {
        let fileData = await readFile('cdw_ace23_buddies.json');
        const result = fileData.some(item => item.employeeId === data.employeeId);
        if (result) {
            console.log("result" + result);
            let response = { status: 400, message: "USER ALREADY FOUND" }
            return response;
        }
        else {
            fileData.push(data);
            await writeFile('cdw_ace23_buddies.json', fileData);
            let response = { status: 201, message: "DATA APPENDED" }
            return response;
        }
    }
    catch (error) {
        let response = { status: 404, message: "FILE NOT FOUND" }
            return response;
    }
}


// delete user
const deleteAllServices = async (data) => {
    try {
        let fileData = await readFile('cdw_ace23_buddies.json');
        if (fileData.length == 0) {
            let response = { status:201, message: "NO DATA TO DELETE" }
            return response;
        }
        else {
            fileData.push(data);
            fileData.splice(0);
            await writeFile('cdw_ace23_buddies.json', fileData);
            let response = { status: 200, message: "All data deleted" }
            return response;
        }
    }
    catch (error) {
        let response = { status: 404, message: "FILE NOT FOUND" }
        return response;
    }
}

const deleteServices = async (data) => {
    try {
        let fileData = await readFile('cdw_ace23_buddies.json');
        if (fileData.length == 0) {
            let response = { status: 201, message: "NO DATA TO DELETE" }
            return response;
        }
        else {
            let fileData1 = fileData.filter(obj => !(obj.employeeId == data.params.id));
            console.log(fileData1);
            if (fileData1.length == fileData.length) {
                let response = { status: 201, message: "Buddy Not found" }
                return response;
            }
            else {
                await writeFile('cdw_ace23_buddies.json', fileData1);
                let response = { status: 200, message: "Deleted User" }
                return response;
            }
        }
    }
    catch (error) {
        let response = { status: 404, message: "FILE NOT FOUND" }
        return response;
    }
}
// update user
const updateServices = async (data) => {
    try {
        let fileData = await readFile('cdw_ace23_buddies.json');
        let filteredData = fileData.filter(obj => obj.employeeId == data.params.id);
        if (filteredData.length == 0) {
            let response = { status: 201, message: "NO DATA TO DELETE" }
            return response;
        } else {
            fileData = fileData.filter(obj => obj.employeeId != data.params.id);
            fileData.push(data.body);
            await writeFile('cdw_ace23_buddies.json', fileData);
            let response = { status: 200, message: "Updated User" }
                return response;
        }
    }
    catch (error) {
        let response = { status: 404, message: "FILE NOT FOUND" }
            return response;
    }

}
// read user
const readServices = async () => {
    try {
        let fileData = await readFile('cdw_ace23_buddies.json');
        let response = { status: 200, message: fileData }
         return response;
    }
    catch (error) {
        let response = { status: 404, message: "FILE NOT FOUND" }
        return response;
    }
}

const fetchServices = async (data, id) => {
    try {
        let fileData = await readFile('cdw_ace23_buddies.json');
        fileData.push(data);
        let filteredData = fileData.filter(obj => obj.employeeId == id);
        if (filteredData.length == 0) {
            let response = { status: 201, message: "NO DATA TO DELETE" }
            return response;
        } else {
            let response = { status: 200, message: filteredData[0] }
            return response;
        }
    }
    catch (error) {
        let response = { status: 404, message: "FILE NOT FOUND" }
            return response;
    }

}

module.exports = { createServices, fetchServices, readServices, updateServices, deleteServices, deleteAllServices };



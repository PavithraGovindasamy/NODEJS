let fs = require('fs');
const { readFile } = require('../utilities/Utilities');
const { writeFile } = require('../utilities/Utilities')
// create user
let createServices = async (data) => {
    let fileData = await readFile('cdw_ace23_buddies.json');
    const result = fileData.some(item => item.employeeId === data.employeeId);
    if (result) {
        console.log("result" + result);
        return "USER ALREADY FOUND";
    }
    else {
        fileData.push(data);
        await writeFile('cdw_ace23_buddies.json', fileData);
        return "DATA APPENDED";
    }
}


// delete user
const deleteAllServices = async (data) => {
    let fileData = await readFile('cdw_ace23_buddies.json');
    if (fileData.length == 0)
        return "No data to delete";
    else {
        fileData.push(data);
        fileData.splice(0);
        await writeFile('cdw_ace23_buddies.json', fileData);
        return "All data deleted";
    }
}

const deleteServices = async (data) => {
    let fileData = await readFile('cdw_ace23_buddies.json');
    if (fileData.length == 0)
        return "No data to delete";
    else {
        let fileData1 = fileData.filter(obj => !(obj.employeeId == data.params.id));
        console.log(fileData1);
        if (fileData1.length == fileData.length) {
            return "Buddy not found";
        }
        else {
            await writeFile('cdw_ace23_buddies.json', fileData1);
            return "Deleted User";
        }
    }
}
// update user
const updateServices = async (data) => {
    let fileData = await readFile('cdw_ace23_buddies.json');
    let filteredData = fileData.filter(obj => obj.employeeId == data.params.id);
    if (filteredData.length == 0) {
        return "Buddy not found";
    } else {
        fileData = fileData.filter(obj => obj.employeeId != data.params.id);
        fileData.push(data.body);
        await writeFile('cdw_ace23_buddies.json', fileData);
        return "Updated User";
    }

}
// read user
const readServices = async () => {
    let fileData = await readFile('cdw_ace23_buddies.json');
    return fileData;
}

const fetchServices = async (data, id) => {
    let fileData = await readFile('cdw_ace23_buddies.json');
    fileData.push(data);
    let filteredData = fileData.filter(obj => obj.employeeId == id);
    if (filteredData.length == 0) {
        return "Buddy not found";
    } else {
        return filteredData[0];
    }

}

module.exports = { createServices, fetchServices, readServices, updateServices, deleteServices, deleteAllServices };



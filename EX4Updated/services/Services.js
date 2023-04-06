let fs = require('fs');
const { readFile } = require('../utilities/FileSync');
const { writeFile } = require('../utilities/FileSync')
// create user
let createServices = async (req, res) => {
    let fileData = await readFile('cdw_ace23_buddies.json');
    console.log("USER CREATED")
    fileData.push(req.body);
    await writeFile('cdw_ace23_buddies.json', fileData);
    res.send(fileData);
}

// delete user
const deleteAllServices = async (req, res) => {
    let fileData = await readFile('cdw_ace23_buddies.json');
    fileData.push(req.body);
    fileData.splice(0);
    res.send("All data deleted" + fileData);
    await writeFile('cdw_ace23_buddies.json', fileData);
}
const DeleteServices = async (req, res) => {
    let data = req.params.id;
    let fileData = await readFile('cdw_ace23_buddies.json');
    fileData.push(req.body);
    var len = Object.keys(fileData).length;
    let index = fileData.findIndex(obj => obj.employeeId == data);
    fileData.splice(index, 1);
    res.send("Deleted User");
    await writeFile('cdw_ace23_buddies.json', fileData);
}
// update user
let updateServices = async (req, res) => {
    let fileData = await readFile('cdw_ace23_buddies.json');
    // fileData.push(req.body);
    let data1 = req.params.id;
    var len = Object.keys(fileData).length;
    let index = fileData.findIndex(obj => obj.employeeId == data1);
    fileData[index] = req.body;
    res.send("Updated successfully");
    await writeFile('cdw_ace23_buddies.json', fileData);
}
// read user
let ReadServices = async (req, res) => {
    let fileData = await readFile('cdw_ace23_buddies.json');
    fileData.push(req.body);
    res.send(fileData);
}

let FetchServices = async (req, res) => {
    let data = req.params.id;
    let fileData = await readFile('cdw_ace23_buddies.json');
    fileData.push(req.body);
    var len = Object.keys(fileData).length;
    let index = fileData.findIndex(obj => obj.employeeId == data);
    res.send(fileData[index]);
}

module.exports = { createServices, FetchServices, ReadServices, updateServices, DeleteServices, deleteAllServices };



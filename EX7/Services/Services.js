const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { readFile } = require("../utilities/utilities");
const { writeFile } = require("../utilities/utilities");
const { Console } = require('console');
const logger=require('../Logger/logger')
require('dotenv').config
const registerUserServices = async (req, res) => {
    try {
        const { username, password } = req.body;
        bcrypt.hash(password, 10, async (err, hash) => {
            const users = await readFile('user.json');
            console.log('users:', users);
            users.push({ username, password: hash });
            await writeFile('user.json', users);
            res.send('User registered');
        });
    }
    catch (err) {
        console.log(err);
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send("File Not Found");
    }
}

const loginUserServices = async (req, res) => {
    try{
    const { username, password } = req.body;
    const user = await readFile('user.json');
    //  console.log(JSON.stringify(user))
    // const newUser = JSON.parse(user);
    const usersFind = user.find(u => u.username === username);
    console.log(password, username)
    if (usersFind) {
        console.log("Hey correct user");
        const token = jwt.sign({ username }, process.env.ACCESS_KEY,
            );
        res.send(token);
    }

    else {
        console.log("Invalid user");
        res.send("Invalid username or password")
    }
} catch(err){
    console.log(err);
    logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(500).send("File Not Found");
}
}


const createUserServices = async (data, req) => {
    try {
        let fileData = await readFile('task.json');
        console.log("Jello" + fileData);
        let usertoken = req.headers.authorization;
        let token = usertoken.split(' ');
        let decoded = jwt.verify(token[1], process.env.ACCESS_KEY);
        req.body.username = decoded;
        console.log(data);
        fileData.push(data);
        await writeFile('task.json', fileData);
        return "Data Appended";
    }
    catch (err) {
        console.log(err);
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send("File Not Found");
    }
}




const deleteUserServices = async (data) => {
    try {
        const usertoken = data.headers.authorization;
        const token = usertoken.split(' ');
        const decoded = jwt.verify(token[1], process.env.ACCESS_KEY);
        data.body.username = decoded;

        let fileData = await readFile('task.json');

        if (fileData.length == 0)
            return "No data to delete";
        else {
            var len = Object.keys(fileData).length;
            let index;
            for (i = 0; i < len; i++) {
                if (fileData[i].taskid == data.params.id ) {
                    index = i;
                    console.log(index);
                }
            }
            if (index != null) {
                fileData.splice(index, 1);
                await writeFile('task.json', fileData);
                return "Deleted User";
            }
            else {
                return "No Data for this  User  Found"
            }

        }
    }
    catch (err) {
        console.log(err);
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send("File Not Found");
    }

}

const updateUserServices = async (data) => {
    try {
        const usertoken = data.headers.authorization;
        const token = usertoken.split(' ');
        const decoded = jwt.verify(token[1], process.env.ACCESS_KEY);
        data.body.username = decoded;
        let fileData = await readFile('task.json');
        let index = fileData.findIndex(obj => obj.taskid == data.params.id && obj.username == data.body.username);
        let filteredData = index > -1 ? [fileData[index]] : [];
        console.log(data.body.username);

        if (filteredData.length== -1) {
            console.log(filteredData.length)
            return "User not found";
        } else {
            for (temp in fileData){
                if(fileData[temp].taskid==data.params.id){
            fileData = fileData.filter(obj => obj.taskid != data.params.id);
            console.log(fileData);
            fileData.push(data.body);
            await writeFile('task.json', fileData);
            return "Updated User";
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send("File Not Found");
    }

}




const readUserServices = async (data,res) => {
    try {
        let fileData = await readFile('task.json');
        // let userData = JSON.parse(fileData);
        const usertoken = data.headers.authorization;
        console.log(data)
        const token = usertoken.split(' ');
        const decoded = jwt.verify(token[1], process.env.ACCESS_KEY);
        data.body.username = decoded;
        fileData= JSON.stringify(fileData)
        return fileData.filter(user => user.username === data.body.username);
    }
    catch (err) {
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message}   - ${req.ip}`);
        res.status(500).send("File Not Found");
    }
}


const readSpecificUserServices = async (data, id,res) => {
    try {
        let fileData = await readFile('task.json');
        fileData.push(data);
        // console.log("HEUU");
        const usertoken = data.headers.authorization;
        const token = usertoken.split(' ');
        const decoded = jwt.verify(token[1], process.env.ACCESS_KEY);
        data.body.username = decoded;
        var len = Object.keys(fileData).length;
        for (i = 0; i < len; i++) {
            if (fileData[i].taskid == data.params.id && fileData[i].username == data.body.username) {
                return fileData[i];
            }

        }
    }
    catch (err) {
        console.log(err);
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send("File Not Found");
    }
    // if (filteredData.length == 0) {
    //     return "User not found";
    // } else {
    //     return filteredData[0];
    // }

}
const sortUserServices = async (data) => {
    try {
        let fileData = await readFile('task.json');
        const usertoken = data.headers.authorization;
        const token = usertoken.split(' ');
        const decoded = jwt.verify(token[1], process.env.ACCESS_KEY);
        data.body.username = decoded;

        function sortByProperty(property) {
            return function (a, b) {
                if (a[property] > b[property]) {
                    return -1;
                } else if (a[property] < b[property]) {
                    return 1;
                }
                return 0;
            };
        }

        let sortedData = [...fileData].sort(sortByProperty(data.params.property));
        console.log(sortedData);
        let filteredData = sortedData.filter(user => user.username === data.body.username);
        return filteredData;
    }
    catch (err) {
        console.log(err);
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send("File Not Found");
    }
}

const filterUserServices = async (data) => {
    try {
        let fileData = await readFile('task.json');

        return fileData;
    }
    catch (err) {
        console.log(err);
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send("File Not Found");
    }
}
const paginateUserServices = async (data,res) => {
    try {
        var authorization = data.headers.authorization.split(' ')[1],
            decoded;
        decoded = jwt.verify(authorization, process.env.ACCESS_KEY);
        let Filedata = await readFile('./task.json');
        const page = parseInt(data.query.pageno) || 1;
        const limit = parseInt(data.query.limit) || 5;
        const skip = (page - 1) * limit;
        console.log(Filedata);
        if (data == "false") {
            return "Not found";
        }
        else {
            Filedata = Filedata.filter(temp => {
                return temp.username === data.body.username
            });
            const records = Filedata.slice(skip, skip + limit);
            if (records.length == 0) {
                return "No records found";
            }
            else if (records.length < limit) {
                return "Limit less than expected";
            }
            else {
                return "Success";
            }
        }
    }
    catch (err) {
        console.log(err);
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send("File Not Found");

    }
}




module.exports = { registerUserServices, loginUserServices, createUserServices, deleteUserServices, updateUserServices, readUserServices, readSpecificUserServices, sortUserServices, paginateUserServices, filterUserServices }
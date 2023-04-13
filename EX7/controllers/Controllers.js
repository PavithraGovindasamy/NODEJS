const fs = require('fs');
const user = require('../Services/Services');
const { readFile } = require("../utilities/utilities");
const path = require('path');
const jwt = require('jsonwebtoken');
const { type } = require('os');
const logger=require('../Logger/logger')

require('dotenv').config({ path: path.resolve(__dirname, 'env', '.env') });


const registerUser = async function (req, res) {
    try {
        logger.info(`${req.originalUrl} - ${req.ip}`);
        const userFile = await readFile('user.json');
        const { username, password } = req.body;
        const userFound = userFile.find(u => u.username === username);
        if (userFound) {
            res.send("USER ALREADY FOUND");
        } else {
            user.registerUserServices(req,res);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const loginUser = function (req, res) {
    logger.info(`${req.originalUrl} - ${req.ip}`);
    user.loginUserServices(req, res);
}
const createUser = async function (req, res) {
    logger.info(`${req.originalUrl} - ${req.ip}`);
    let fileData = await readFile('task.json');
    const result = fileData.some(item => item.taskid === req.body.taskid);
    if (result) {
        res.send("USER ALREADY FOUND");
    }
    else {
        let response = await user.createUserServices(req.body, req);
        res.send({ message: response });
        console.log(response);
    }


}
const deleteUser = async function (req, res) {
    logger.info(`${req.originalUrl} - ${req.ip}`);

    let response = await user.deleteUserServices(req,res);
    res.send({ message: response });
}
const updateUser = async function (req, res) {
    logger.info(`${req.originalUrl} - ${req.ip}`);
    let response = await user.updateUserServices(req,res);
    res.send({ message: response });
}
const sortUser =async function (req, res) {
    logger.info(`${req.originalUrl} - ${req.ip}`);
    let response=await user.sortUserServices(req,res);
    res.send({message:response});
}
const readUser = async function (req, res) {
    logger.info(`${req.originalUrl} - ${req.ip}`);
    let response = await user.readUserServices(req,res);
    res.send({ message: response });
}
const readSpecificUser = async function (req, res) {
    logger.info(`${req.originalUrl} - ${req.ip}`);
    let response = await user.readSpecificUserServices(req, req.params.id,res);
    res.send({ message: response });
}

const filterUser=async function(req,res){
    logger.info(`${req.originalUrl} - ${req.ip}`);
    let response = await user.filterUserServices(req, req.params.id);
    res.send({ message: response });
}


const paginateUser=async function(req,res){
    logger.info(`${req.originalUrl} - ${req.ip}`);
    let response = await user.paginateUserServices(req, req.params.id,res);
    res.send({ message: response });
}

module.exports = { registerUser, loginUser, createUser, deleteUser, updateUser, sortUser, readSpecificUser, readUser,paginateUser,filterUser }
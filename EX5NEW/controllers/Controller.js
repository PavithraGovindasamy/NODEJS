const fs = require('fs');
let buddyList = require("../services/Services");
const logger=require('../loggers/logger.js');
// create user
const createDetails = async (req, res) => {
  logger.info(`${req.originalUrl} - ${req.ip}`);
  if (req.body.employeeId == "" || req.body.realName == "" || req.body.nickName == "" || req.body.dob == "" || req.body.hobbies == "") {
    res.send("Please enter all fields");
  }
  else {
    let response = await buddyList.createServices(req.body);
    if (response.status > 400) {
      logger.error(`${response.status} - ${res.statusMessage} - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(response.status).send(response);
    }
    else if (response.status == 204) {
      logger.warn(`${response.status} - ${res.statusMessage} - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(response.status).send(response);
    }
    else {
      res.status(response.status).send(response);
    }

  }
}

// delete user
const deleteAll = async (req, res) => {
  logger.info(`${req.originalUrl} - ${req.ip}`);
  let response = await buddyList.deleteAllServices(req.body);
  if (response.status > 400) {
    logger.error(`${response.status} - ${res.statusMessage} - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(response.status).send(response);
  }
  else if (response.status == 204) {
    logger.warn(`${response.status} - ${res.statusMessage} - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(response.status).send(response);
  }
  else {
    res.status(response.status).send(response);
  }
}

const deleteDetails = async (req, res) => {
  logger.info(`${req.originalUrl} - ${req.ip}`);
  let response = await buddyList.deleteServices(req);
  if (response.status > 400) {
    logger.error(`${response.status} - ${res.statusMessage} - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(response.status).send(response);
  }
  else if (response.status == 204) {
    logger.warn(`${response.status} - ${res.statusMessage} - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(response.status).send(response);
  }
  else {
    res.status(response.status).send(response);
  }
}

// read user
const readDetails = async (req, res) => {
  logger.info(`${req.originalUrl} - ${req.ip}`);
  let response = await buddyList.readServices();
  if (response.status > 400) {
    logger.error(`${response.status} - ${res.statusMessage} - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(response.status).send(response);
  }
  else if (response.status == 204) {
    logger.warn(`${response.status} - ${res.statusMessage} - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(response.status).send(response);
  }
  else {
    res.status(response.status).send(response);
  }
}

const fetchDetails = async (req, res) => {
  logger.info(`${req.originalUrl} - ${req.ip}`);
  let response = await buddyList.fetchServices(req.body, req.params.id);
  if (response.status > 400) {
    logger.error(`${response.status} - ${res.statusMessage} - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(response.status).send(response);
  }
  else if (response.status == 204) {
    logger.warn(`${response.status} - ${res.statusMessage} - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(response.status).send(response);
  }
  else {
    res.status(response.status).send(response);
  }
}

// update user
const updateDetails = async (req, res) => {
  logger.info(`${req.originalUrl} - ${req.ip}`);
  let response = await buddyList.updateServices(req);
  if (response.status > 400) {
    logger.error(`${response.status} - ${res.statusMessage} - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(response.status).send(response);
  }
  else if (response.status == 204) {
    logger.warn(`${response.status} - ${res.statusMessage} - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(response.status).send(response);
  }
  else {
    res.status(response.status).send(response);
  }
}

module.exports = { createDetails, deleteDetails, deleteAll, readDetails, fetchDetails, updateDetails };

const fs = require('fs');
let buddyList = require("../services/Services");
// create user
const createDetails = async (req, res) => {
  if (req.body.employeeId == "" || req.body.realName == "" || req.body.nickName == "" || req.body.dob == "" || req.body.hobbies == "") {
    res.send("Please enter all fields");
  }
  else {
    let response = await buddyList.createServices(req.body);
    console.log(response);
    res.send({ message: response });
  }
}

// delete user
const deleteAll = async (req, res) => {
  let response = await buddyList.deleteAllServices(req.body);
  res.send({ message: response });
}
const deleteDetails = async (req, res) => {
  let response = await buddyList.deleteServices(req);
  res.send({ message: response });
}

// read user
const readDetails = async (req, res) => {
  let response = await buddyList.readServices();
  res.send({ message: response });
}
const fetchDetails = async (req, res) => {
  let response = await buddyList.fetchServices(req.body, req.params.id);
  res.send({ message: response });
}

// update user
const updateDetails = async (req, res) => {
  let response = await buddyList.updateServices(req);
  res.send({ message: response });
}

module.exports = { createDetails, deleteDetails, deleteAll, readDetails, fetchDetails, updateDetails };

let fs = require('fs');
let buddyList = require("../services/Services");
// create user
const createDetails = (req, res) => {
  let id = req.params.id;
  if (req.body.employeeId == "" || req.body.realName == "" || req.body.nickName == "" || req.body.dob == "" || req.body.hobbies == "") {
    res.send("Please enter all fields");
  }
  else {
    buddyList.createServices(req, res);
  }
}

// delete user
const deleteAll = (req, res) => {
  buddyList.deleteAllServices(req, res);
}
const deleteDetails = (req, res) => {
  let id = req.query.id;
  buddyList.DeleteServices(req, res);
}

// read user
const readDetails = (req, res) => {
  buddyList.ReadServices(req, res);
}
const fetchDetails = (req, res) => {
  buddyList.FetchServices(req, res);

}

// update user
const updateDetails = (req, res) => {
  buddyList.updateServices(req, res);
}

module.exports = { createDetails, deleteDetails, deleteAll, readDetails, fetchDetails, updateDetails };

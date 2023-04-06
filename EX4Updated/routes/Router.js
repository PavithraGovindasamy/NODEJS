const express = require('express');
const router = express.Router();

let Controller = require('../controllers/Controller.js');
// create user
router.post('/', Controller.createDetails);
// delete user
router.delete('/', Controller.deleteAll)
router.delete('/:id', Controller.deleteDetails);
// read user
router.get('/', Controller.readDetails);
router.get('/:id', Controller.fetchDetails);
// update user
router.put('/:id', Controller.updateDetails);


module.exports = router;

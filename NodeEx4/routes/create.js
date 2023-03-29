const express=require('express');
const router=express.Router();

let createController=require('../controllers/create.js');
router.post('/',createController.createDetails);
module.exports=router;

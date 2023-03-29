const express=require('express');
const router=express.Router();

let readController=require('../controllers/read.js');
router.get('/',readController.readDetails);

router.get('/:id',readController.fetchDetails);
module.exports=router;
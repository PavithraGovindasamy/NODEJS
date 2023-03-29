const express=require('express');
const router=express.Router();

let updateController=require('../controllers/update');
router.put('/:id',updateController.updateDetails);


module.exports=router;
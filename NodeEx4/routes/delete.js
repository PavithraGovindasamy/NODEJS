const express=require('express');
const router=express.Router();
let deleteController=require('../controllers/delete.js');
router.delete('/:id',deleteController.deleteDetails);
module.exports=router;
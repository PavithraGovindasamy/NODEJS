const express=require('express');
const router=express.Router();
const Controller=require('../controllers/Controllers');
const checkToken=require('../utilities/jwt');

router.post('/register',(req,res)=>{
    Controller.registerUser(req,res);
});
router.get('/login',(req,res)=>{
    Controller.loginUser(req,res);
})


 router.post('/create',checkToken,(req,res)=>{
     Controller.createUser(req,res);
 })

router.delete('/delete/:id',checkToken,(req,res)=>{
    Controller.deleteUser(req,res);
})
router.put('/update/:id',checkToken,(req,res)=>{
    Controller.updateUser(req,res);
})
router.get('/read',checkToken,(req,res)=>{
    Controller.readUser(req,res);
})
router.get('/read/:id',checkToken,(req,res)=>{
    Controller.readSpecificUser(req,res);
})
router.post('/sort/:property',checkToken,(req,res)=>{
    Controller.sortUser(req,res);
})
router.get('/filter',checkToken,(req,res)=>{
    Controller.filterUser(req,res);
})

router.get('/pagination/',checkToken,(req,res)=>{
    Controller.paginateUser(req,res);
})


module.exports=router;
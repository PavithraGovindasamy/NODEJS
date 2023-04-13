const jwt = require('jsonwebtoken');
require('dotenv').config

const checkToken=(req,res,next)=>{
const  token =req.headers.authorization.split(' ')[1];
   jwt.verify(token ,process.env.ACCESS_KEY,(err,username)=>{
    if(err) res.send("NOT valid Token");
    else{
       // res.send("VALID TOKEN" +username);
        next();
    }
   })
}
module.exports=checkToken;

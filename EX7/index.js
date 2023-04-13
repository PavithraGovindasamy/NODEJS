const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');
const Router=require('./Routers/Routers.js')

require('dotenv').config({ path: path.resolve(__dirname, 'env', '.env') });
const port = process.env.port;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/users',Router);



app.use('/',(req,res)=>{
    userRegister=[];
    fs.writeFile('user.json',JSON.stringify(userRegister),err=>{
        if(err) throw err;
      res.send("File Created");
    });
});
app.listen(port,()=>{
    console.log("PORT" +port)
})




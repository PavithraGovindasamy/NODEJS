
const exp = require('constants');
let express=require('express');
let app=express(); 
let port=5000;



let cors=require('cors');
 app.use(cors({
    origin:['http://localhost:5502',"http://127.0.0.1:5502"],
    method:["get","post","put","delete"],
 }));

let url=require('url');; // old way
app.use(express.urlencoded({extended:false}));  /// we dont need to parse
app.use(express.json());     
let createRoute=require('./routes/create');
 app.use('/create',createRoute);

 let updateRoute=require('./routes/update');
 app.use("/update",updateRoute);


let readRoute=require('./routes/read');
 app.use('/read',readRoute);



let delRoute=require('./routes/delete');
app.use('/delete',delRoute);


app.use("/",(req,res)=>{
    const fs = require("fs");
    buddies=[];
    fs.writeFile("cdw_ace23_buddies.json", JSON.stringify(buddies), err => {
         
        // Checking for errors
        if (err) throw err; 
       
    res.send("File created"); // Success
    });
    
    });

app.listen(port,()=>{
    console.log("Port"+port);
}); 




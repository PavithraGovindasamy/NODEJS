// import
const express = require('express');
const fs = require("fs");
const Router = require('./routes/Router');
const app = express();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'env', '.env') });
const port = process.env.port;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// create user
app.use('/buddies', Router);

// cors
let cors = require('cors');
app.use(cors({
    origin: ['http://localhost:5501', "http://127.0.0.1:5501"],
    method: ["get", "post", "put", "delete"],
}));

// create file
app.use("/", (req, res) => {
    buddies = [];
    fs.writeFile("cdw_ace23_buddies.json", JSON.stringify(buddies), err => {
        if (err) throw err;
        res.send("File created");
    });

});

app.listen(port, () => {
    console.log("Port" + port);
});




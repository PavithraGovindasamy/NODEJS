// import
let express = require('express');
let url = require('url');
let createRoute = require('./routes/Router');
let updateRoute = require('./routes/Router');
let readRoute = require('./routes/Router');
let delRoute = require('./routes/Router');
let app = express();
let port = 5072;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// create user
app.use('/create', createRoute);
// update user
app.use("/update", updateRoute);
// read user
app.use('/read', readRoute);
// del user
app.use('/delete', delRoute);

// create file
app.use("/", (req, res) => {
    const fs = require("fs");
    buddies = [];
    fs.writeFile("cdw_ace23_buddies.json", JSON.stringify(buddies), err => {
        if (err) throw err;

        res.send("File created"); // Success
    });

});

app.listen(port, () => {
    console.log("Port" + port);
});




let fs = require('fs');
const readDetails = (req, res) => {
    fs.readFile("cdw_ace23_buddies.json", "UTF-8", (err, data) => {
        if (err) throw err;
        res.send(data);
    })
}
const fetchDetails = (req, res) => {
    let data = req.params.id;
    const fileData = JSON.parse(fs.readFileSync('cdw_ace23_buddies.json'))
    fileData.push(req.body)
    var len = Object.keys(fileData).length;
    for (i = 0; i < len; i++) {
        if (!isNaN(data)) {
            console.log(typeof(data));
            if (fileData[i].employeeId == data) {
                res.send(fileData[i]);
                break;
            }
           
        }
        else if (isNaN(data)) {
            if (fileData[i].realName == data) {
                res.send(fileData[i]);
                break;
            }

        }
    }

}
module.exports = { readDetails, fetchDetails };
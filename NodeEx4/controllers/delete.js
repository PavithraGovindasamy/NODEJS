let fs = require('fs');

const deleteDetails = (req, res) => {
    let data = req.params.id;
    const fileData = JSON.parse(fs.readFileSync('cdw_ace23_buddies.json'))
    fileData.push(req.body)
    var len = Object.keys(fileData).length;
    let index;
    for (i = 0; i < len; i++) {
        if (fileData[i].employeeId == data) {
            index = i;
            console.log(index);
            res.send("deleted successfully");

            break;
        }
    }
    fileData.splice(index,1);
    fs.writeFileSync("cdw_ace23_buddies.json",JSON.stringify(fileData,null,3));

}


module.exports = { deleteDetails };
let fs = require('fs');
const updateDetails = (req, res) => {
    let fileData = JSON.parse(fs.readFileSync('cdw_ace23_buddies.json'));

         let data1 = req.params.id;
       
        var len = Object.keys(fileData).length;
        for (i = 0; i < len; i++) {
                if (fileData[i].employeeId == data1) {
                    fileData[i].employeeId=req.body.employeeId;
                    fileData[i].realName=req.body.realName;
                    fileData[i].nickName=req.body.nickName;
                    fileData[i].dob=req.body.dob;
                    fileData[i].hobbies=req.body.hobbies;
                    res.send(fileData[i]);
                    break;
                }
                fs.writeFileSync("cdw_ace23_buddies.json",JSON.stringify(fileData,null,3));
              res.send("updated successfully");
        }
        
  
    
}
module.exports = { updateDetails};
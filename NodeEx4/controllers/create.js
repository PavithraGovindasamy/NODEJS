let fs=require('fs');
const createDetails=(req,res)=>{
    const fileData = JSON.parse(fs.readFileSync('cdw_ace23_buddies.json'))
    fileData.push(req.body)
    fs.writeFile("cdw_ace23_buddies.json",JSON.stringify(fileData, null, 2),(err)=>{
        if(err) throw err;
        res.send("Appended");
    })
}
module.exports={createDetails};
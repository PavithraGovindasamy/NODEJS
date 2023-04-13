const fs = require('fs/promises');
// read a file
const readFile = async (url, error) => {
    let data = await fs.readFile(url, { encoding:'utf-8' });
  //  console.log(data);
    return JSON.parse(data);
}
// write into a file
const writeFile = async (url, data) => {
    try {
        await fs.writeFile(url, JSON.stringify(data));
        console.log('Data written to file');
    } catch (error) {
        console.error(error);
    }
};

module.exports = { readFile, writeFile }
const { Random } = require("random-js");
const random = new Random();
let http = require('http');
let fs = require('fs');

http.createServer((req, res, err) => {
    if (err) throw err;

    if (req.url != "/favicon.ico") {
        let colorCodeFile = "color_palette.json";
        let colorCodes = fs.readFileSync(colorCodeFile, 'UTF-8');
        const colors = JSON.parse(colorCodes);
        for (let i = 0; i < 5; i++) {
            const value = random.integer(150, 185);
            for (temp in colors) {
                if (value == colors[temp].id) {
                    res.write(JSON.stringify(colors[temp], null, 3));
                    break;
                }
            }
        }



    }
    res.end();

}).listen(2000);
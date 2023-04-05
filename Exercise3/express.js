const { Random } = require("random-js");
const random = new Random();
let fs = require('fs');
let colorCodeFile = "./color_palette.json";
let colorCodes = fs.readFileSync(colorCodeFile, 'UTF-8');
let colors = JSON.parse(colorCodes);

for (let i = 0; i < 5; i++) {
    const value = random.integer(150, 185);
    for (temp in colors)
        if (value == colors[temp].id)
            console.log(colors[temp]);
}


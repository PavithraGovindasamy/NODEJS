const fs = require('fs');
let colorFile, flag = 1;
try {
  colorFile = fs.readFileSync("./color_palette.json");
  colorFile = JSON.parse(colorFile);
  if (colorFile.length == 0) {
    console.log("No data found");
    flag = 0;
  }
  else if (colorFile.length < 5) {
    console.log("Value less than 5");
    flag = 0;
  }
}
catch (err) {
  console.log("No file found");
  flag = 0;
}


let j;
if (flag != 0) {
  // Shuffle the array of colors randomly
  for (let i = colorFile.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    [colorFile[i], colorFile[j]] = [colorFile[j], colorFile[i]];
  }
  let randomisedColor = colorFile.slice(0, 5);
  fs.writeFileSync('randomised_color_palette.json', JSON.stringify(randomisedColor));
  let randomizedColorsFile;
  try {
    randomizedColorsFile = fs.readFileSync('randomised_color_palette.json');
  }
  catch (err) {
    console.log("No file found");
  }
  randomizedColorsFile = JSON.parse(randomizedColorsFile);
  console.log(randomizedColorsFile);
  console.log("Finished running program.");
}

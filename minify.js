const gm = require("gm").subClass({ imageMagick: "7+" });
const fs = require("fs");
const printImageData = require("./printImageData");

async function transformImg(imgPath, toImg) {
  const imgBuffer = fs.readFileSync(imgPath);
  return new Promise((resolve, reject) => {
    gm(imgBuffer)
      .samplingFactor(4, 2)
      .strip() // remove all profiles and comments
      .interlace("Plane") // Interlace type
      .gaussian(0.05) // reduce noise
      .quality(80)
      .write(toImg, async function (err) {
        if (err) return console.dir(arguments);
        console.log(this.outname + " created  ::  " + arguments[3]);

        const img1BufferResult = fs.readFileSync(toImg);
        await printImageData(imgBuffer);
        await printImageData(img1BufferResult);
        console.log("\n\n");
        resolve();
      });
  });
}

async function main() {
  await transformImg("img1.jpg", "./img1-res.jpg");
  await transformImg("img1.jpg", "./img1-res.webp");
  await transformImg("img1.jpg", "./img1-res.png");
}

main();
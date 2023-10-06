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
      .gaussian(imgPath.includes('.png') ? 0.05 : 0)
      .quality(75)
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
  await transformImg("img1.jpg", "./results/res-img1.jpg");
  await transformImg("img2.png", "./results/res-img2.png");
  await transformImg("img3.webp", "./results/res-img3.webp");
  await transformImg("img4.avif", "./results/res-img4.avif");
}

main();
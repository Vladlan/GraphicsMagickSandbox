const sharp = require("sharp");
const fs = require("fs");
const printImageData = require("./printImageData");

async function transformImg(imgPath) {
  const imgName = imgPath.split(".")[0];
  const outPath = (ext) => `./results-sharp/${imgName}.${ext}`;
  const imgBuffer = fs.readFileSync(imgPath);
  await printImageData(imgBuffer);

  // jpeg
  await sharp(imgPath).jpeg({
    quality: 75,
    chromaSubsampling: "4:2:0",
    mozjpeg: true,
    progressive: true,
    force: true,
  }).toFile(outPath('jpeg'));
  const img1BufferResult = fs.readFileSync(outPath('jpeg'));
  await printImageData(img1BufferResult);

  // png
  await sharp(imgPath).png({
    quality: 75,
    compressionLevel: 9,
    adaptiveFiltering: true,
    force: true,
  }).toFile(outPath('png'));
  const img2BufferResult = fs.readFileSync(outPath('png'));
  await printImageData(img2BufferResult);

  // webp
  await sharp(imgPath).webp({
    quality: 75,
    force: true,
  }).toFile(outPath('webp'));
  const img3BufferResult = fs.readFileSync(outPath('webp'));
  await printImageData(img3BufferResult);

  // avif
  await sharp(imgPath).avif({
    quality: 75,
    force: true,
  }).toFile(outPath('avif'));
  const img4BufferResult = fs.readFileSync(outPath('avif'));
  await printImageData(img4BufferResult);
}

async function main() {
  await transformImg("img1.jpg")
  await transformImg("img2.png")
}

main();

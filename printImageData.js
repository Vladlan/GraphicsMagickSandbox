const gm = require("gm").subClass({ imageMagick: "7+" });

function printImageData(imgBuffer) {
  return new Promise((resolve, reject) => {
    gm(imgBuffer).identify(function (err, data) {
      if (err) {
        reject(err);
      }
      console.log(`data.format: `, data.format);
      console.log(`data.Geometry: `, data.Geometry);
      console.log(`data.Depth: `, data.Depth);
      console.log(`data.Filesize: `, formatFileSize(data.Filesize));
      console.log(`data.Interlace: `, data.Interlace);
      console.log(`-------------------------------------------------------:`);
      resolve();
    });
  });
}

module.exports = printImageData;

function formatFileSize(str) {
  if (str.includes("MiB")) return str;
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

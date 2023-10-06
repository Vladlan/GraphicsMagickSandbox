const gm = require('gm').subClass({ imageMagick: '7+' });
const fs = require('fs');
const printImageData = require('./printImageData');
const img1Path = './img1.jpg';
const img1ResPath = './img1-res1.jpg';
const img2Path = './img2-res1.jpg';
const img2ResPath = './img2-res2.jpg';

async function printImageComparison() {
    const img1Buffer = fs.readFileSync(img1Path);
    await printImageData(img1Buffer);
    gm(img1Buffer)
        // .resize(960, 600)
        .scale(0.5)
        .density(288, 288)
        .fill('red')
        .fontSize(8)
        .drawText(30, 60, '640x360')
        // .geometry(1280, 720)
        .filter('Triangle')
        .define('filter:support=2')
        .unsharp(0.25, 0.25, 8, 0.065)
        .quality(50)
        .define('jpeg:fancy-upsampling=off')
        .define('png:compression-filter=5')
        .define('png:compression-level=9')
        .define('png:compression-strategy=1')
        .define('png:exclude-chunk=all')
        .interlace('Line')
        .colorspace('RGB')
        .strip()
        .write(img1ResPath, function (err) {
            if (err) {
                console.log(err);
                return
            }
            const img1BufferResult = fs.readFileSync(img1ResPath);
            printImageData(img1BufferResult);
        });
};

printImageComparison();

/// Code below just to check is there any difference between buffer img source or usual path source

// gm('./img1.jpg')
// .resize(960, 600)
// .write('./img1-res1.jpg', function (err) {
//   if (!err) console.log('done1');
//   if (err) console.log(err);
// });

// gm('./img1.jpg')
// .resize(960, 600)
// .write('./img1-res1.webp', function (err) {
//   if (!err) console.log('done1');
//   if (err) console.log(err);
// });

// gm('./img2.png')
// .resize(1280, 720)
// .write('./img2-res1.jpg', function (err) {
//   if (!err) console.log('done2');
//   if (err) console.log(err);
// });




// gm(img1Buffer, 'img1.jpg')
// .resize(960, 600)
// .write('./img1-res2.jpg', function (err) {
//   if (!err) console.log('done1');
//   if (err) console.log(err);
// });

// gm(img1Buffer, 'img1.jpg')
// .resize(960, 600)
// .write('./img1-res2.webp', function (err) {
//   if (!err) console.log('done1');
//   if (err) console.log(err);
// });


// gm(img2Buffer, 'img2.png')
// .resize(1280, 720)
// .write('./img2-res2.jpg', function (err) {
//   if (!err) console.log('done2');
//   if (err) console.log(err);
// });
const capture = require('capture-screenshot')
const compareImages = require('resemblejs/compareImages');
const fs = require('fs')
const mfs = require("mz/fs");

function captureScreenshot(filename) {
  capture({ url: 'https://f-arruza.github.io/' })
    .then(imgs => {
      fs.writeFileSync(filename, imgs.chrome)
    });
}

async function getDiff(input_image01, input_image02, output_image){
    const options = {
        output: {
            errorColor: {
                red: 255,
                green: 0,
                blue: 255
            },
            errorType: 'movement',
            transparency: 0.3,
            largeImageThreshold: 1200,
            useCrossOrigin: false,
            outputDiff: true
        },
        scaleToSameSize: true,
        ignore: ['nothing', 'less', 'antialiasing', 'colors', 'alpha'],
    };

    // The parameters can be Node Buffers
    // data is the same as usual with an additional getBuffer() function
    const data = await compareImages(
        await mfs.readFile(input_image01),
        await mfs.readFile(input_image02),
        options
    );

    await mfs.writeFile(output_image, data.getBuffer());
}

module.exports.captureScreenshot = captureScreenshot;
module.exports.getDiff = getDiff;

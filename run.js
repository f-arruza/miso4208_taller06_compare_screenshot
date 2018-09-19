const delay = require('delay');

var app = require("./script.js");

var input_image01 = 'capture01.png';
var input_image02 = 'capture02.png';
var output_image = 'result.png';

// Se toman dos (2) Screenshot de la página https://f-arruza.github.io/
app.captureScreenshot(input_image01);
app.captureScreenshot(input_image02);

// Se comparan los imágenes y se genera una imagen resultante
(async() => {
    const result = await delay(2000);
    // Executed after 2000 milliseconds
    app.getDiff(input_image01, input_image02, output_image);
})();

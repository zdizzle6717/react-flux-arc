'use strict';

var fs = require("fs");
const sass = require('node-sass');
const autoPrefixer = require('autoprefixer');
const autoPrefix = require('postcss')([autoPrefixer]);

// Compile SCSS
sass.render({
    file: 'src/styles/app.scss',
    outputStyle: 'compressed'
}, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }

    autoPrefix.process(result.css.toString())
        .then((result) => {
            let dataString = result.css.toString();
            let kbs = Buffer.byteLength(dataString) / 1000;

            result.warnings().forEach(function(warn) {
                console.warn(warn.toString());
            });
            fs.writeFileSync('dist/css/style.css', dataString, 'utf8');
        });
});

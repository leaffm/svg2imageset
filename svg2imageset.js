#!/usr/bin/env node

require('shelljs/global');

var path = require('path');
var fs = require('fs');
var _ = require('lodash');

if (!which('rsvg-convert')) {
  echo('rsvg-convert bin from libsrvg is required');
  exit(1);
}

var opts = require("nomnom")
   .option('width', {
      abbr: 'x',
      help: 'Input svg width'
   })
   .option('height', {
      abbr: 'y',
      help: 'Input svg height'
   })
   .option('output', {
      abbr: 'o',
      default: 'sets/',
      help: 'Output svg path'
   })
   .parse();

mkdir('-p', path.join(opts.output));

var svgFiles = opts._;

svgFiles.forEach(function(svgPath) {

    var baseName = path.basename(svgPath, '.svg');
    var output = opts.output + baseName;

    if (!fs.existsSync(output)){
        fs.mkdirSync(output);
    }

    convert(svgPath, output, opts.width, opts.height, 1);
    convert(svgPath, output, opts.width, opts.height, 2);
    convert(svgPath, output, opts.width, opts.height, 3);

    var imgset = {
        "images" : [
            {
            "idiom" : "universal",
            "filename" : baseName + ".png",
            "scale" : "1x"
            },
            {
            "idiom" : "universal",
            "filename" : baseName + "2x.png",
            "scale" : "2x"
            },
            {
            "idiom" : "universal",
            "filename" : baseName + "@3x.png",
            "scale" : "3x"
            }
        ],
        "info" : {
            "version" : 1,
            "author" : "xcode"
        }
    };

    var imgFile = path.join(output, 'Contents.json');    
    fs.writeFileSync(imgFile, JSON.stringify(imgset, null, 4),'utf8');
});

function convert (svgPath, output, width, height, ratio){

    var baseName = path.basename(svgPath, '.svg');
    var ext = ratio === 1 ? '' : '@' + ratio + 'x';
    var outputPath =  output ? path.join(output, baseName + ext + '.png') : '';
    
    var args = _.compact([
        width ? '-w ' + width * ratio : null,
        height ? '-h ' + height * ratio : null,
        '--keep-aspect-ratio',
        '--dpi-x 90',
        '--dpi-y 90',
        '-f png',
        svgPath,
        '-o ' + outputPath
    ]);

    echo('rsvg-convert ' + args.join(' '));
    var cmd = exec('rsvg-convert ' + args.join(' '));
    if (cmd.code !== 0) {
        echo('Error converting file: ' + svgPath + ' with ratio ' + ratio);
    }
}

exit(0);
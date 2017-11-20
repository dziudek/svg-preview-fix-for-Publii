const fs = require('fs');
const SVG2JS = require('./svg2js');

let fileContent = fs.readFileSync(__dirname + '/input/svg-map.svg');
let svg2js = new SVG2JS(fileContent.toString());
let result = svg2js.generateJson();

fs.writeFileSync(__dirname + '/output/svg-map.js', 'window.publiiSvgFix = ' + JSON.stringify(result));

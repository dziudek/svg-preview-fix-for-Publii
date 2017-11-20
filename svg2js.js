const fs = require('fs');

class SVG2JS {
    constructor(svgContent) {
        this.svgContent = svgContent;
        this.svgContent = this.svgContent.replace(/>\s+?</gmi, '><');
    }

    extractSymbols() {
        let symbols = this.svgContent.match(/<symbol.*?<\/symbol>/g);
        return symbols;
    }

    getViewBox(symbol) {
        let viewBox = symbol.match(/viewBox="(.*?)"/gi);
        viewBox = viewBox[0].replace(/viewBox="/i, '');
        viewBox = viewBox.replace('"', '');

        return viewBox;
    }

    getContent(symbol) {
        let content = symbol.replace(/<symbol.*?>/g, '');
        content = content.replace('</symbol>', '');

        return content;
    }

    getAnchor(symbol) {
        let anchor = symbol.match(/<symbol id=".*?"/);
        anchor = anchor[0].replace('<symbol id="', '');
        anchor = anchor.replace('"', '');

        return '#' + anchor;
    }

    generateJson() {
        let symbols = this.extractSymbols();
        let output = {};

        for(let symbol of symbols) {
            let anchor = this.getAnchor(symbol);
            let obj = {
                viewbox: this.getViewBox(symbol),
                content: this.getContent(symbol)
            };

            output[anchor] = obj;
        }

        return output;
    }
}

module.exports = SVG2JS;

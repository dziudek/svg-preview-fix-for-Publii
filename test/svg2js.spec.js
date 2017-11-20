const fs = require('fs');
const {assert} = require('chai');
const SVG2JS = require('../svg2js');

describe('SVG2JS', function() {
    let fileContent = fs.readFileSync(__dirname + '/fixtures/svg-map.svg', 'utf8');
    let svg2js = new SVG2JS(fileContent);

    describe('#extractSymbols()', function() {
        it('should return array with symbols text', function() {
            let symbols = svg2js.extractSymbols();
            let expectedSymbols = [`<symbol id="search" viewBox="0 0 24 23"><path d="M23.565 20.458l-6.847-6.847a8.974 8.974 0 1 0-1.935 2.28l6.674 6.675a1.49 1.49 0 0 0 2.107-2.107zM9 16a7 7 0 1 1 7-7 7.008 7.008 0 0 1-7 7z"/></symbol>`];
            assert.deepEqual(expectedSymbols, symbols);
        });
    });

    describe('#getViewBox()', function() {
        it('should get proper viewbox value from given symbol', function() {
            let symbol = `<symbol id="search" viewBox="0 0 24 23"><path d="M23.565 20.458l-6.847-6.847a8.974 8.974 0 1 0-1.935 2.28l6.674 6.675a1.49 1.49 0 0 0 2.107-2.107zM9 16a7 7 0 1 1 7-7 7.008 7.008 0 0 1-7 7z"/></symbol>`;
            let viewboxValue = svg2js.getViewBox(symbol);
            assert.equal('0 0 24 23', viewboxValue);
        });
    });

    describe('#getContent()', function() {
        it('should get proper content from given symbol', function() {
            let symbol = `<symbol id="search" viewBox="0 0 24 23"><path d="M23.565 20.458l-6.847-6.847a8.974 8.974 0 1 0-1.935 2.28l6.674 6.675a1.49 1.49 0 0 0 2.107-2.107zM9 16a7 7 0 1 1 7-7 7.008 7.008 0 0 1-7 7z"/></symbol>`;
            let contentValue = svg2js.getContent(symbol);
            assert.equal('<path d="M23.565 20.458l-6.847-6.847a8.974 8.974 0 1 0-1.935 2.28l6.674 6.675a1.49 1.49 0 0 0 2.107-2.107zM9 16a7 7 0 1 1 7-7 7.008 7.008 0 0 1-7 7z"/>', contentValue);
        });
    });

    describe('#getAnchor()', function() {
        it('should get proper anchor name from given symbol', function() {
            let symbol = `<symbol id="search" viewBox="0 0 24 23"><path d="M23.565 20.458l-6.847-6.847a8.974 8.974 0 1 0-1.935 2.28l6.674 6.675a1.49 1.49 0 0 0 2.107-2.107zM9 16a7 7 0 1 1 7-7 7.008 7.008 0 0 1-7 7z"/></symbol>`;
            let anchorValue = svg2js.getAnchor(symbol);
            assert.equal('#search', anchorValue);
        });
    });

    describe('#generateJson()', function() {
        it('should return object with anchor name, viewbox and content', function() {
            let retrievedObject = svg2js.generateJson();
            let expectedObject = {
                '#search': {
                    'viewbox': '0 0 24 23',
                    'content': '<path d="M23.565 20.458l-6.847-6.847a8.974 8.974 0 1 0-1.935 2.28l6.674 6.675a1.49 1.49 0 0 0 2.107-2.107zM9 16a7 7 0 1 1 7-7 7.008 7.008 0 0 1-7 7z"/>'
                }
            };

            assert.equal('object', typeof retrievedObject['#search']);
            assert.equal(expectedObject['#search'].viewbox, retrievedObject['#search'].viewbox);
            assert.equal(expectedObject['#search'].content, retrievedObject['#search'].content);
        });
    });
});

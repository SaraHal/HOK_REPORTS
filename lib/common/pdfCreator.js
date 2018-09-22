'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createPdf = undefined;

var _htmlPdf = require('html-pdf');

var _htmlPdf2 = _interopRequireDefault(_htmlPdf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createPdf = exports.createPdf = function createPdf(html, config) {
    return new Promise(function (resolve, reject) {
        _htmlPdf2.default.create(html, config).toBuffer(function (err, res) {
            err ? reject(err) : resolve(res);
        });
    });
};
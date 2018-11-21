"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPdf = void 0;

var _htmlPdf = _interopRequireDefault(require("html-pdf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createPdf = function createPdf(html, config) {
  return new Promise(function (resolve, reject) {
    _htmlPdf.default.create(html, config).toBuffer(function (err, res) {
      err ? reject(err) : resolve(res);
    });
  });
};

exports.createPdf = createPdf;
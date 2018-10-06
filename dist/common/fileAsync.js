"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeAllBytes = exports.readAllBytes = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readAllBytes = function readAllBytes(filePath, encoding) {
  return new Promise(function (resolve, reject) {
    _fs.default.readFile(filePath, encoding, function (err, data) {
      err ? reject(err) : resolve(data);
    });
  });
};

exports.readAllBytes = readAllBytes;

var writeAllBytes = function writeAllBytes(filePath, buffer) {
  return new Promise(function (resolve, reject) {
    _fs.default.writeFile(filePath, buffer, "binary", function (err) {
      err ? reject(err) : resolve();
    });
  });
};

exports.writeAllBytes = writeAllBytes;
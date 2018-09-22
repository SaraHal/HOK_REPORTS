"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.writeAllBytes = exports.readAllBytes = undefined;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readAllBytes = exports.readAllBytes = function readAllBytes(filePath, encoding) {
    return new Promise(function (resolve, reject) {
        _fs2.default.readFile(filePath, encoding, function (err, data) {
            err ? reject(err) : resolve(data);
        });
    });
};

var writeAllBytes = exports.writeAllBytes = function writeAllBytes(filePath, buffer) {
    return new Promise(function (resolve, reject) {
        _fs2.default.writeFile(filePath, buffer, "binary", function (err) {
            err ? reject(err) : resolve();
        });
    });
};
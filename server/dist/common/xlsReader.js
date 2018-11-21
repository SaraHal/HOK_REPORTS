"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _iconvLite = _interopRequireDefault(require("iconv-lite"));

var _fileAsync = require("./fileAsync");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readFile = function readFile(filePath) {
  return (0, _fileAsync.readAllBytes)(filePath).then(function (data) {
    return _iconvLite.default.decode(data, 'win1255');
  });
};

var foramtHeader = function foramtHeader(header, mapping) {
  return header.reduce(function (accumulator, key, index) {
    accumulator[mapping[key]] = key.trim();
    return accumulator;
  }, {});
};

var formatRows = function formatRows(rows, header, mapping) {
  return rows.map(function (row) {
    return row.split('\t').reduce(function (accumulator, currentValue, currentIndex) {
      accumulator[mapping[header[currentIndex]]] = currentValue.trim();
      return accumulator;
    }, {});
  });
};

var foramtData = function foramtData(data, mapping) {
  var rows = data.split('\n');
  var header = rows.splice(0, 1)[0].split('\t');
  return {
    headers: foramtHeader(header, mapping),
    records: formatRows(rows, header, mapping)
  };
};

var read = function read(filePath, mapping) {
  return readFile(filePath).then(function (data) {
    return foramtData(data, mapping);
  });
};

var _default = {
  read: read
};
exports.default = _default;
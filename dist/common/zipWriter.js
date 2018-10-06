"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getZip = void 0;

var _archiver = _interopRequireDefault(require("archiver"));

var _streamBuffers = _interopRequireDefault(require("stream-buffers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getZip = function getZip(files) {
  var outputStreamBuffer = new _streamBuffers.default.WritableStreamBuffer({
    initialSize: 1000 * 1024,
    // start at 1000 kilobytes.
    incrementAmount: 1000 * 1024 // grow by 1000 kilobytes each time buffer overflows.

  });
  var archive = (0, _archiver.default)('zip', {
    zlib: {
      level: 9 // Sets the compression level.

    }
  });
  archive.pipe(outputStreamBuffer);
  files.forEach(function (file) {
    archive.append(file.buffer, {
      name: file.fileName
    });
  });
  archive.finalize();
  return new Promise(function (resolve, reject) {
    outputStreamBuffer.on('finish', function () {
      resolve(outputStreamBuffer.getContents());
    });
  });
};

exports.getZip = getZip;
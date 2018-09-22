'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getZip = undefined;

var _archiver = require('archiver');

var _archiver2 = _interopRequireDefault(_archiver);

var _streamBuffers = require('stream-buffers');

var _streamBuffers2 = _interopRequireDefault(_streamBuffers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getZip = exports.getZip = function getZip(files) {
    var outputStreamBuffer = new _streamBuffers2.default.WritableStreamBuffer({
        initialSize: 1000 * 1024, // start at 1000 kilobytes.
        incrementAmount: 1000 * 1024 // grow by 1000 kilobytes each time buffer overflows.
    });
    var archive = (0, _archiver2.default)('zip', {
        zlib: { level: 9 // Sets the compression level.
        } });
    archive.pipe(outputStreamBuffer);
    files.forEach(function (file) {
        archive.append(file.buffer, { name: file.fileName });
    });

    archive.finalize();

    return new Promise(function (resolve, reject) {
        outputStreamBuffer.on('finish', function () {
            resolve(outputStreamBuffer.getContents());
        });
    });
};
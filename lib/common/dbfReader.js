"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _iconvLite = require("iconv-lite");

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _fileAsync = require("./fileAsync");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resources = {
    fieldDescriptionByteLength: 32,
    byteIndex: {
        fieldDescription: 32,
        headerLength: 8,
        recordLength: 10,
        recordCount: 4
    }

};

var fieldTypesForamt = function () {

    function fieldNumber(d) {
        return isNaN(d = +d) ? null : d;
    }

    function fieldString(d) {
        return d.trim() || null;
    }

    function fieldDate(d) {
        return new Date(+d.substring(0, 4), d.substring(4, 6) - 1, +d.substring(6, 8));
    }

    function fieldBoolean(d) {
        return (/^[nf]$/i.test(d) ? false : /^[yt]$/i.test(d) ? true : null
        );
    }
    return {
        B: fieldNumber,
        C: fieldString,
        D: fieldDate,
        F: fieldNumber,
        L: fieldBoolean,
        M: fieldNumber,
        N: fieldNumber
    };
}();

function fieldName(string) {
    var i = string.indexOf("\0");
    return i < 0 ? string : string.substring(0, i);
}

var splitBySize = function splitBySize(arr, size) {
    var splitedArr = [];
    for (var i = 0; i < arr.length; i += size) {
        splitedArr.push(arr.slice(i, i + size));
    }
    return splitedArr;
};

var foramtFieldDescription = function foramtFieldDescription(fieldDescriptionByte, index, mapping) {

    return {
        name: fieldName(_iconvLite2.default.decode(fieldDescriptionByte.slice(0, 11), 'CP862')),
        type: fieldDescriptionByte.toString("ascii", 11, 12),
        length: fieldDescriptionByte.readUInt8(16),
        index: index
    };
};

var foramtRecord = function foramtRecord(headers, recordsByte) {
    var currentIndex = 1;

    return headers.reduce(function (accumulator, header) {

        accumulator[header.name] = fieldTypesForamt[header.type](_iconvLite2.default.decode(recordsByte.slice(currentIndex, currentIndex += header.length), 'CP862'));
        return accumulator;
    }, {});
};

var readHeader = function readHeader(fieldsDescriptionByte, mapping) {
    var index = 0;
    return splitBySize(fieldsDescriptionByte, resources.fieldDescriptionByteLength).map(function (fieldDescriptionByte) {
        var header = foramtFieldDescription(fieldDescriptionByte, index);
        header.name = mapping[header.name];
        index += header.length;
        return header;
    });
};

var readRecords = function readRecords(headers, recordCount, recordsByte) {
    var recordLength = recordsByte.length / recordCount;
    return splitBySize(recordsByte, recordLength).map(function (recordByte) {
        return foramtRecord(headers, recordByte);
    });
};
var read = function read(file, mapping) {
    var fieldDescriptionByteLength = resources.fieldDescriptionByteLength,
        byteIndex = resources.byteIndex;


    return (0, _fileAsync.readAllBytes)(file).then(function (data) {
        var recordCount = data.readUInt32LE(byteIndex.recordCount),
            headerLength = data.readUInt16LE(byteIndex.headerLength),
            fieldsDescriptionBytes = data.slice(byteIndex.fieldDescription, headerLength - 2),
            recordsByte = data.slice(headerLength, data.length);

        var headers = readHeader(fieldsDescriptionBytes, mapping);
        var records = readRecords(headers, recordCount, recordsByte);
        return {
            headers: headers, records: records
        };
    });
};

exports.default = { read: read };
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCompanyFeeByDate = exports.getFeeListByDate = undefined;

var _dbfReader = require('../common/dbfReader');

var _dbfReader2 = _interopRequireDefault(_dbfReader);

var _config = require('../../config.json');

var _dateFormat = require('dateFormat');

var _dateFormat2 = _interopRequireDefault(_dateFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbfMapping = {
    "DATEGVI": "date",
    "MOSADNAME": "companyName",
    "CODNOSE": "companyCode",
    "SCUMGVI": "totalSum",
    "CAMUTGVI": "amount",
    "SCUMNEW": "SCUMNEW",
    "CAMUTNEW": "CAMUTNEW",
    "AMLGVI": "AMLGVI",
    "AMLNEW": "AMLNEW",
    "DOLAR": "dollarRate"
};
var handleGetFeeList = function handleGetFeeList(records) {
    return records.map(function (amla) {
        amla.companyName = amla.companyName && amla['companyName'].split('').reverse().join('');
        return amla;
    });
};

var getFeeList = function getFeeList() {
    return _dbfReader2.default.read(_config.dataPath + '\\AMLOT.DBF', dbfMapping).then(function (data) {
        return handleGetFeeList(data.records);
    });
};

var getFeeListByDate = exports.getFeeListByDate = function getFeeListByDate(date) {
    return getFeeList().then(function (data) {
        return data.filter(function (fee) {
            return (0, _dateFormat2.default)(fee.date, 'dd/mm/yyyy') === (0, _dateFormat2.default)(new Date(date), 'dd/mm/yyyy');
        });
    });
};

var getCompanyFeeByDate = exports.getCompanyFeeByDate = function getCompanyFeeByDate(companyCode, date) {
    return getFeeListByDate(date).then(function (data) {
        return data.find(function (fee) {
            return fee.companyCode == companyCode;
        });
    });
};
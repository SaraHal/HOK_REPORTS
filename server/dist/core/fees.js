"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCompanyFeeByDate = exports.getFeeListByDate = void 0;

var _dbfReader = _interopRequireDefault(require("../common/dbfReader"));

var _config = require("../../config.json");

var _dateFormat = _interopRequireDefault(require("dateFormat"));

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
  return _dbfReader.default.read("".concat(_config.dataPath, "\\AMLOT.DBF"), dbfMapping).then(function (data) {
    return handleGetFeeList(data.records);
  });
};

var getFeeListByDate = function getFeeListByDate(date) {
  return getFeeList().then(function (data) {
    return data.filter(function (fee) {
      return (0, _dateFormat.default)(fee.date, 'dd/mm/yyyy') === (0, _dateFormat.default)(new Date(date), 'dd/mm/yyyy');
    });
  });
};

exports.getFeeListByDate = getFeeListByDate;

var getCompanyFeeByDate = function getCompanyFeeByDate(companyCode, date) {
  return getFeeListByDate(date).then(function (data) {
    return data.find(function (fee) {
      return fee.companyCode == companyCode;
    });
  });
};

exports.getCompanyFeeByDate = getCompanyFeeByDate;
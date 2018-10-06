"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCompanyListByReportDate = exports.getReportContent = void 0;

var _xlsReader = _interopRequireDefault(require("../common/xlsReader"));

var _company = require("./company");

var _dateFormat = _interopRequireDefault(require("dateFormat"));

var _config = require("../../config.json");

var _pdfConfig = _interopRequireDefault(require("../resources/collectionReport/pdfConfig"));

var _pdfCreator = require("../common/pdfCreator");

var _htmlCreator = require("../common/htmlCreator");

var _fees = require("./fees");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var xlsMapping = {
  ' טלפון': 'telephone',
  ' תוכנית': 'program',
  ' מ.תוכנית': 'programNo',
  ' שם': 'name',
  ' מס\' חשבון': 'account',
  ' ת.הצטרפות': 'joinDate',
  ' ת.פתיחה': 'startDate',
  ' ת.סיום': 'endDate',
  ' ת.ביטול': 'cancelDate',
  ' סכום (ש"ח)': 'sum',
  ' סכום ($)': 'sumD',
  ' כתובת': 'address',
  ' עיר': 'city'
};

var mapReportData = function mapReportData(companyDetails, fee, collectionData) {
  return {
    company: {
      name: companyDetails.name,
      address: companyDetails.address
    },
    dollarRate: fee.dollarRate,
    day: (0, _dateFormat.default)(new Date(fee.date), "dd"),
    date: fee.date,
    month: (0, _dateFormat.default)(new Date(fee.date), "mmmm yyyy"),
    data: collectionData.records.map(function (item) {
      item.name = item.name.slice(-15);
      item.programNo = item.programNo.slice(-5);
      item.account = item.account.split(" ").reverse().join(" ");
      item.startDate = item.startDate.substr(4);
      item.endDate = item.endDate.substr(4);
      item.sum = (Number(item.sum) + Number(item.sumD) * Number(fee.dollarRate)).toFixed(2);
      return item;
    }),
    header: collectionData.headers,
    totalSum: fee.totalSum
  };
};

var getReportData = function getReportData(companyKey, date) {
  var collectionDatafilePath = "".concat(_config.dataPath, "\\").concat(companyKey, "\\hok_bank\\XS").concat((0, _dateFormat.default)(new Date(date), 'ddmmyy'), ".XLS");
  var getCompanyPromise = (0, _company.getCompany)(companyKey);
  var getCompanyFeeByDatePromise = getCompanyPromise.then(function (company) {
    return (0, _fees.getCompanyFeeByDate)(company.code, date);
  });

  var getCollectionDataPromise = _xlsReader.default.read(collectionDatafilePath, xlsMapping);

  return Promise.all([getCompanyPromise, getCompanyFeeByDatePromise, getCollectionDataPromise]).then(function (results) {
    return mapReportData.apply(void 0, _toConsumableArray(results));
  });
};

var getReportContent = function getReportContent(companyKey, date) {
  if (!companyKey) throw new Error('compenyKey is required');
  return getReportData(companyKey, date).then(function (data) {
    return (0, _htmlCreator.createHtml)(data, './src/resources/collectionReport/template.html');
  }).then(function (html) {
    return (0, _pdfCreator.createPdf)(html, (0, _pdfConfig.default)());
  });
};

exports.getReportContent = getReportContent;

var getCompanyListByReportDate = function getCompanyListByReportDate(date) {
  var comapnyListPromise = (0, _company.getCompanyList)(),
      feeListPromise = (0, _fees.getFeeListByDate)(date);
  return Promise.all([comapnyListPromise, feeListPromise]).then(function (results) {
    var _results = _slicedToArray(results, 2),
        comapnyList = _results[0],
        feeList = _results[1];

    return comapnyList.filter(function (company) {
      return company.isActive && feeList.some(function (fee) {
        return fee.companyCode == company.code;
      });
    });
  });
};

exports.getCompanyListByReportDate = getCompanyListByReportDate;
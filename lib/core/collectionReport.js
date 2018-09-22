'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCompanyListByReportDate = exports.getReportContent = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _xlsReader = require('../common/xlsReader');

var _xlsReader2 = _interopRequireDefault(_xlsReader);

var _company = require('./company');

var _dateFormat = require('dateFormat');

var _dateFormat2 = _interopRequireDefault(_dateFormat);

var _config = require('../../config.json');

var _pdfConfig = require('../resources/collectionReport/pdfConfig');

var _pdfConfig2 = _interopRequireDefault(_pdfConfig);

var _pdfCreator = require('../common/pdfCreator');

var _htmlCreator = require('../common/htmlCreator');

var _fees = require('./fees');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
        day: (0, _dateFormat2.default)(new Date(fee.date), "dd"),
        date: fee.date,
        month: (0, _dateFormat2.default)(new Date(fee.date), "mmmm yyyy"),
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

    var collectionDatafilePath = _config.dataPath + '\\' + companyKey + '\\hok_bank\\XS' + (0, _dateFormat2.default)(new Date(date), 'ddmmyy') + '.XLS';

    var getCompanyPromise = (0, _company.getCompany)(companyKey);
    var getCompanyFeeByDatePromise = getCompanyPromise.then(function (company) {
        return (0, _fees.getCompanyFeeByDate)(company.code, date);
    });
    var getCollectionDataPromise = _xlsReader2.default.read(collectionDatafilePath, xlsMapping);

    return Promise.all([getCompanyPromise, getCompanyFeeByDatePromise, getCollectionDataPromise]).then(function (results) {
        return mapReportData.apply(undefined, _toConsumableArray(results));
    });
};

var getReportContent = exports.getReportContent = function getReportContent(companyKey, date) {

    if (!companyKey) throw new Error('compenyKey is required');
    return getReportData(companyKey, date).then(function (data) {
        return (0, _htmlCreator.createHtml)(data, './src/resources/collectionReport/template.html');
    }).then(function (html) {
        return (0, _pdfCreator.createPdf)(html, (0, _pdfConfig2.default)());
    });
};

var getCompanyListByReportDate = exports.getCompanyListByReportDate = function getCompanyListByReportDate(date) {
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
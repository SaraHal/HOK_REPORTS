'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.postReportFile = exports.getReportFiles = exports.getReportFile = exports.getReportCompanyList = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fileAsync = require('../common/fileAsync');

var _pathExists = require('path-exists');

var _pathExists2 = _interopRequireDefault(_pathExists);

var _collectionReport = require('../core/collectionReport');

var _company = require('../core/company');

var _config = require('../../config.json');

var _zipWriter = require('../common/zipWriter');

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transporter = _nodemailer2.default.createTransport('smtps://a0504149062@gmail.com:hator9elad@smtp.gmail.com');

var getReportFolderPath = function getReportFolderPath(companyId) {
    return _config.dataPath + '\\' + companyId + '\\hok_bank';
};

var createReportFile = function createReportFile(companyId, date) {
    return function (fileName) {
        return (0, _collectionReport.getReportContent)(companyId, date).then(function (content) {
            return (0, _fileAsync.writeAllBytes)(fileName, content);
        });
    };
};

var getReportFileContent = function getReportFileContent(filePath, createReportFileCurry) {
    return (0, _pathExists2.default)(filePath).then(function (isExists) {
        if (!isExists) {
            return createReportFileCurry(filePath);
        }
    }).then(function () {
        return (0, _fileAsync.readAllBytes)(filePath);
    });
};

var getReportCompanyList = exports.getReportCompanyList = function getReportCompanyList(date) {
    return (0, _collectionReport.getCompanyListByReportDate)(date);
};

var getReportFile = exports.getReportFile = function getReportFile(date, companyId) {
    var fileName = '' + companyId + date + '.pdf';
    var createReportFileCurry = createReportFile(companyId, date);
    var filePath = getReportFolderPath(companyId) + '\\' + fileName;
    return getReportFileContent(filePath, createReportFileCurry).then(function (content) {
        return { fileName: fileName, content: content };
    });
};

var getReportFiles = exports.getReportFiles = function getReportFiles(date, companyList) {
    return Promise.all(companyList.map(function (companyId) {
        return getReportFile(date, companyId);
    })).then(_zipWriter.getZip).then(function (zipFile) {
        return zipFile.toJSON();
    });
};

var postReportFile = exports.postReportFile = function postReportFile(date, companyKey) {
    var getReportPromise = getReportFile(date, companyKey);
    var getCompanyPromise = (0, _company.getCompany)(companyKey);

    return Promise.all([getCompanyPromise, getReportPromise]).then(function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : data,
            _ref2 = _slicedToArray(_ref, 2),
            company = _ref2[0],
            file = _ref2[1];

        return transporter.sendMail({
            from: '"שירותי מחשב" <aa@gmail.com>',
            to: company.email,
            subject: '\u05D3\u05D5\u05D7 \u05D2\u05D1\u05D9\u05D4 \u05DC\u05D9\u05D5\u05DD ' + date,
            body: 'mail content...',
            attachments: [{ filename: file.fileName, content: file.content }]
        });
    });
};
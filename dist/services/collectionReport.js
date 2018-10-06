"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postReportFile = exports.getReportFiles = exports.getReportFile = exports.getReportCompanyList = void 0;

var _fileAsync = require("../common/fileAsync");

var _pathExists = _interopRequireDefault(require("path-exists"));

var _collectionReport = require("../core/collectionReport");

var _company = require("../core/company");

var _config = require("../../config.json");

var _zipWriter = require("../common/zipWriter");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var transporter = _nodemailer.default.createTransport('smtps://a0504149062@gmail.com:hator9elad@smtp.gmail.com');

var getReportFolderPath = function getReportFolderPath(companyId) {
  return "".concat(_config.dataPath, "\\").concat(companyId, "\\hok_bank");
};

var createReportFile = function createReportFile(companyId, date) {
  return function (fileName) {
    return (0, _collectionReport.getReportContent)(companyId, date).then(function (content) {
      return (0, _fileAsync.writeAllBytes)(fileName, content);
    });
  };
};

var getReportFileContent = function getReportFileContent(filePath, createReportFileCurry) {
  return (0, _pathExists.default)(filePath).then(function (isExists) {
    if (!isExists) {
      return createReportFileCurry(filePath);
    }
  }).then(function () {
    return (0, _fileAsync.readAllBytes)(filePath);
  });
};

var getReportCompanyList = function getReportCompanyList(date) {
  return (0, _collectionReport.getCompanyListByReportDate)(date);
};

exports.getReportCompanyList = getReportCompanyList;

var getReportFile = function getReportFile(date, companyId) {
  var fileName = "".concat(companyId).concat(date, ".pdf");
  var createReportFileCurry = createReportFile(companyId, date);
  var filePath = "".concat(getReportFolderPath(companyId), "\\").concat(fileName);
  return getReportFileContent(filePath, createReportFileCurry).then(function (content) {
    return {
      fileName: fileName,
      content: content
    };
  });
};

exports.getReportFile = getReportFile;

var getReportFiles = function getReportFiles(date, companyList) {
  return Promise.all(companyList.map(function (companyId) {
    return getReportFile(date, companyId);
  })).then(_zipWriter.getZip).then(function (zipFile) {
    return zipFile.toJSON();
  });
};

exports.getReportFiles = getReportFiles;

var postReportFile = function postReportFile(date, companyKey) {
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
      subject: "\u05D3\u05D5\u05D7 \u05D2\u05D1\u05D9\u05D4 \u05DC\u05D9\u05D5\u05DD ".concat(date),
      body: 'mail content...',
      attachments: [{
        filename: file.fileName,
        content: file.content
      }]
    });
  });
};

exports.postReportFile = postReportFile;
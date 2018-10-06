"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _collectionReport = require("../services/collectionReport");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reportRouter = _express.default.Router();

reportRouter.route('/api/company').get(function (req, res, next) {
  var date = req.query.date;
  (0, _collectionReport.getReportCompanyList)(date).then(function (data) {
    return res.send(data);
  }).catch(next);
});
reportRouter.route('/api/:companyId').get(function (req, res, next) {
  var companyId = req.params.companyId,
      date = req.query.date;
  (0, _collectionReport.getReportFile)(date, companyId).then(function (data) {
    return res.send(data);
  }).catch(next);
});
reportRouter.route('/api/:companyId').post(function (req, res, next) {
  var companyId = req.params.companyId,
      date = req.query.date;
  (0, _collectionReport.postReportFile)(date, companyId).then(function (data) {
    return res.send(data);
  }).catch(next);
});
reportRouter.route('/api/').get(function (req, res, next) {
  var companyList = req.query.companyList;
  var date = req.query.date;
  (0, _collectionReport.getReportFiles)(date, companyList).then(function (data) {
    return res.send(data);
  }).catch(next);
});
reportRouter.route('/').get(function (req, res, next) {
  console.log(_path.default.join(__dirname, 'pages'), _path.default.join(__dirname, '../pages'));
  res.sendFile(_path.default.join(__dirname, '../pages/collecationReport.html'));
});
var _default = reportRouter;
exports.default = _default;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _collectionReport = require('../services/collectionReport');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reportRouter = _express2.default.Router();

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
    res.sendFile(_path2.default.resolve('src/pages/collecationReport.html'));
});

exports.default = reportRouter;
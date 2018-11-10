import express from 'express';
import CollectionReportService from '../services/collectionReport.service'
import path from 'path';

const reportRouter = express.Router();
const _collectionReportService = new CollectionReportService();

reportRouter.route('/api/company')
    .get(function (req, res, next) {
        var { date } = req.query;
        _collectionReportService.getReportOrganizations(date)
            .then(data => res.send(data))
            .catch(next);
    });


reportRouter.route('/api/:organizationKey')
    .get(function (req, res, next) {
        const { organizationKey } = req.params,
            { date } = req.query;
        _collectionReportService.getReportFile(organizationKey, date)
            .then(data => res.send(data))
            .catch(next);
    });

reportRouter.route('/api/:companyId')
    .post(function (req, res, next) {
        const { companyId } = req.params,
            { date } = req.query;
        _collectionReportService.postReportFile(companyId, date)
            .then(data => res.send(data))
            .catch(next);
    });

reportRouter.route('/api/')
    .get(function (req, res, next) {
        const { companyList } = req.query;
        const { date } = req.query;
        _collectionReportService.getReportFiles(companyList, date)
            .then(data => res.send(data))
            .catch(next);
    });

reportRouter.route('/')
    .get(function (req, res, next) {
        console.log(path.join(__dirname, 'pages'), path.join(__dirname, '../pages'));
        res.sendFile(path.join(__dirname, '../pages/collecationReport.html'));
    });

export default reportRouter;
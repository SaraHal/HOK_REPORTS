import express from 'express';
import { getReportFile, getReportCompanyList, getReportFiles, postReportFile } from '../services/collectionReport'
import path from 'path';

const reportRouter = express.Router();

reportRouter.route('/api/company')
    .get(function (req, res, next) {
        var { date } = req.query;
        getReportCompanyList(date)
            .then(data => res.send(data))
            .catch(next);
    });


reportRouter.route('/api/:companyId')
    .get(function (req, res, next) {
        const { companyId } = req.params,
            { date } = req.query;
        getReportFile(date, companyId).then(data => res.send(data))
            .catch(next);
    });

reportRouter.route('/api/:companyId')
    .post(function (req, res, next) {
        const { companyId } = req.params,
            { date } = req.query;
        postReportFile(date, companyId)
            .then(data => res.send(data))
            .catch(next);
    });

reportRouter.route('/api/')
    .get(function (req, res, next) {
        const { companyList } = req.query;
        const { date } = req.query;
        getReportFiles(date, companyList)
            .then(data => res.send(data))
            .catch(next);
    });

reportRouter.route('/')
    .get(function (req, res, next) {
        console.log(path.join(__dirname, 'pages'),path.join(__dirname, '../pages'));
        res.sendFile(path.join(__dirname, '../pages/collecationReport.html'));
    });

export default reportRouter;
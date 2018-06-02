import express from 'express';
import { getReportFile, getReportCompanyList, getReportFiles } from '../services/collectionReport'

const reportRouter = express.Router();

reportRouter.route('/company')
    .get(function (req, res) {
        var { date } = req.query;
        getReportCompanyList(date).then(data => res.send(data));
    });


reportRouter.route('/:companyId')
    .get(function (req, res) {
        const { companyId } = req.params,
            { date } = req.query;
        getReportFile(date, companyId).then(data => res.send(data));
    });

reportRouter.route('/')
    .get(function (req, res) {
        const { companyList } = req.query;
        const { date } = req.query;
        getReportFiles(date, companyList).then(data => res.send(data));
    });

export default reportRouter;
import express from 'express';
import CollectionReportService from '../services/collectionReport.service'
import ProjectCollectionReportService from '../services/projectCollectionReport.service'
import path from 'path';

const reportRouter = express.Router();
const _collectionReportService = new CollectionReportService();
const _projectCollectionReportService = new ProjectCollectionReportService();

reportRouter.route('/api/organization')
    .get(function (req, res, next) {
        var { date } = req.query;
        _collectionReportService.getReportOrganizations(date)
            .then(data => res.send(data))
            .catch(next);
    });

reportRouter.route('/api/:organizationKey/projects')
    .get(function (req, res, next) {
        const { organizationKey } = req.params;
        _projectCollectionReportService.getOrganizationProjects(organizationKey)
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

reportRouter.route('/api/:organizationKey/:projectKey')
    .get(function (req, res, next) {
        const { organizationKey, projectKey } = req.params,
            { date } = req.query;
        _projectCollectionReportService.getReportFile(organizationKey, projectKey, date)
            .then(data => res.send(data))
            .catch(next);
    });

reportRouter.route('/api/:organizationKey/:projectKey')
    .post(function (req, res, next) {
        const { organizationKey, projectKey } = req.params,
            { date } = req.query;
        _projectCollectionReportService.postReportFile(organizationKey, projectKey, date)
            .then(data => res.send(data))
            .catch(next);
    });


reportRouter.route('/api/:organizationKey')
    .post(function (req, res, next) {
        const { organizationKey } = req.params,
            { date } = req.query;
        _collectionReportService.postReportFile(organizationKey, date)
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
        res.sendFile(path.join(__dirname, '../pages/index.html'));
    });

export default reportRouter;
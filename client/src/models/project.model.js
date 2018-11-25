import CollectionReportService from '../services/collectionReport.service';
export default class Project {

    constructor(project) {

        const { key, name, organizaitionKey ,email} = project;
        Object.assign(this, { key, name, organizaitionKey ,email});

        this._collectionReportService = new CollectionReportService();
    }

    downloadFile(reportDate) {
        return this._collectionReportService
            .getProjectReportFile(this.organizaitionKey, this.key, reportDate);
    }

    postProject(reportDate) {
        return this._collectionReportService
            .sendProjectReportFile(this.organizaitionKey, this.key, reportDate);
    }

}
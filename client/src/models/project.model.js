import CollectionReportService from '../services/collectionReport.service';
export default class Project {

    constructor(project) {

        const { key, name, organizaitionKey } = project;
        Object.assign(this, { key, name, organizaitionKey });

        this._collectionReportService = new CollectionReportService();
    }

    downloadFile(reportDate) {
        return this._collectionReportService
            .getProjectReportFile(this.organizaitionKey, this.key, reportDate);
    }

    postProject() {

    }

}
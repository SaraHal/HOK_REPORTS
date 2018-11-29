import Project from './project.model';
import CollectionReportService from '../services/collectionReport.service';
export default class Organization {

    constructor(organization) {
        const { key, name, projects, email } = organization;
        const _projects = projects.map(prj => new Project(Object.assign(prj, { organizaitionKey: key })));
        Object.assign(this, { key, name, projects: _projects, email });

        this._collectionReportService = new CollectionReportService();
    }

    downloadFile(reportDate) {
        return this._collectionReportService
            .getReportFile(this.key, reportDate);
    }

    sendEmail(reportDate) {
        return this._collectionReportService
            .sendReportFile(this.key, reportDate);
    }
    downloadProjectFiles() {

    }
}


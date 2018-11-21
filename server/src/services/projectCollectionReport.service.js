
import { getZip } from '../common/zipWriter';
import nodemailer from 'nodemailer';

import ProjectCollectionReportGenerator from '../core/projectCollectiontReportGenerator';
import OrganizationReader from '../dataAccess/organizationReader';
import FeeReader from '../dataAccess/feeReader';
import ProjectReader from '../dataAccess/projectReader';

export default class ProjectCollectionReportService {
    constructor() {
        this.feeReader = new FeeReader();
        this.organizationReader = new OrganizationReader();



    }


    getReportFile = (organizationKey, projectKey, date) => {
        const getOrganizationPromise = this.organizationReader.getOrganization(organizationKey);
        const getProjectPromise = new ProjectReader(organizationKey).getProject(projectKey);

        return Promise.all([getOrganizationPromise, getProjectPromise])
            .then(([organization, project]) => this.feeReader.getCompanyFee(organization.code, date).then(fee => {             
                const collectionReportGenerator = new ProjectCollectionReportGenerator(organization, project, date, fee.dollarRate);
                return collectionReportGenerator.getReportBytes();
            })).then(fileContent => {
                return { fileName: `${organizationKey}_${projectKey}_${date}.pdf`, content: fileContent }
            });

    }

    getOrganizationProjects = (organizationKey) => {
        const projectReader = new ProjectReader(organizationKey);
        return projectReader.getProjects();
    };
}
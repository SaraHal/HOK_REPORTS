
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

        this.transporter = nodemailer.createTransport('smtp://a0504149062@gmail.com:hator9elad@smtp.gmail.com');

    }

    postReportFile(organizationKey, projectKey, date) {
        const getReportPromise = this.getReportFile(organizationKey, projectKey, date);
        const getProjectPromise = new ProjectReader(organizationKey).getProject(projectKey);


        return Promise.all([getProjectPromise, getReportPromise])

            .then(([project, file] = data) => {              
                return this.transporter.sendMail({
                    from: '"שירותי מחשב" <aa@gmail.com>',
                    to: project.email,
                    subject: `${project.name} - דוח גביה ליום ${date}`,
                    body: 'mail content...',
                    attachments: [{ filename: file.fileName, content: file.content }]
                });
            })

    }

    getReportFile(organizationKey, projectKey, date) {
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

    getOrganizationProjects(organizationKey) {
        const projectReader = new ProjectReader(organizationKey);
        return projectReader.getProjects();
    };
}
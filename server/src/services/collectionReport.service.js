
import { getZip } from '../common/zipWriter';
import nodemailer from 'nodemailer';

import CollectionReportGenerator from '../core/collectionReportGenerator'
import OrganizationReader from '../dataAccess/organizationReader';
import FeeReader from '../dataAccess/feeReader';
import ProjectReader from '../dataAccess/projectReader';

export default class CollectionReportService {
    constructor() {
        this.feeReader = new FeeReader();
        this.organizationReader = new OrganizationReader();

        this.transporter = nodemailer.createTransport('smtp://a0504149062@gmail.com:hator9elad@smtp.gmail.com');


    }
    getReportFiles(organizations, date) {
        return Promise.all(organizations.map(key => {
            return this.getReportFile(key, date);
        }))
            .then(getZip)
            .then(zipFile => zipFile.toJSON())
    };

    postReportFile(organizationKey, date) {
        const getReportPromise = this.getReportFile(organizationKey, date);
        const getOrganizationsPromise = this.organizationReader.getOrganization(organizationKey)

        return Promise.all([getOrganizationsPromise, getReportPromise])
            .then(([organization, file] = data) => {
                return this.transporter.sendMail({
                    from: '"שירותי מחשב" <aa@gmail.com>',
                    to: organization.email,
                    subject: `דוח גביה ליום ${date}`,
                    body: 'mail content...',
                    attachments: [{ filename: file.fileName, content: file.content }]
                });
            })

    }

    getReportFile(organizationKey, date) {
        return this.organizationReader.getOrganization(organizationKey)
            .then(organization => this.feeReader.getCompanyFee(organization.code, date).then(fee => {
                const collectionReportGenerator = new CollectionReportGenerator(organization, date, fee.dollarRate);
                return collectionReportGenerator.getReportBytes();
            })).then(fileContent => {
                return { fileName: `${organizationKey}${date}.pdf`, content: fileContent }
            });

    }

    getReportOrganizations(date) {
        const getFeesPromise = this.feeReader.getFees(date);
        const getOrganizationsPromise = this.organizationReader.getOrganizations();

        return Promise.all([getFeesPromise, getOrganizationsPromise])
            .then(([fees, organizations]) => fees.map(fee => {
                return organizations.find(orgn => orgn.code === fee.organizationCode)
            }))
            .then(orgs => {
                return Promise.all(orgs.map(org => new ProjectReader(org.key)
                    .getProjects()
                    .then(prjs => Object.assign({}, org, { projects: prjs }))
                ))
            })


    };
}
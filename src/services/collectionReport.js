
import { readAllBytes, writeAllBytes } from '../common/fileAsync'
import pathExists from 'path-exists';
import { getReportContent, getCompanyListByReportDate } from '../core/collectionReport'
import { getCompany } from '../core/company'
import { dataPath } from '../../config.json'
import { getZip } from '../common/zipWriter';
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport('smtps://a0504149062@gmail.com:hator9elad@smtp.gmail.com');

const getReportFolderPath = (companyId) => `${dataPath}\\${companyId}\\hok_bank`;

const createReportFile = (companyId, date) =>
    (fileName) => getReportContent(companyId, date)
        .then(content => writeAllBytes(fileName, content));

const getReportFileContent = (filePath, createReportFileCurry) => {
    return pathExists(filePath)
        .then(isExists => {
            if (!isExists) {
                return createReportFileCurry(filePath);
            }
        }).then(() => {
            return readAllBytes(filePath);
        });
}

export const getReportCompanyList = (date) => {
    return getCompanyListByReportDate(date)
};

export const getReportFile = (date, companyId) => {
    const fileName = `${companyId}${date}.pdf`;
    const createReportFileCurry = createReportFile(companyId, date);
    const filePath = `${getReportFolderPath(companyId)}\\${fileName}`;
    return getReportFileContent(filePath, createReportFileCurry).then(content => {
        return { fileName, content }
    });
};

export const getReportFiles = (date, companyList) => {
    return Promise.all(companyList.map(companyId => {
        return getReportFile(date, companyId);
    }))
        .then(getZip)
        .then(zipFile => zipFile.toJSON())


};

export const postReportFile = (date, companyKey) => {
    const getReportPromise = getReportFile(date, companyKey);
    const getCompanyPromise = getCompany(companyKey);

    return Promise.all([getCompanyPromise, getReportPromise])
        .then(([company, file] = data) => {        
            return transporter.sendMail({
                from: '"שירותי מחשב" <aa@gmail.com>',
                to: company.email,
                subject: `דוח גביה ליום ${date}`,
                body: 'mail content...',
                attachments: [{ filename: file.fileName, content: file.content }]
            });
        })

}
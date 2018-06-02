
import { readAllBytes, writeAllBytes } from '../common/fileAsync'
import pathExists from 'path-exists';
import { getReportBuffer, getCompanyListByReportDate } from '../core/collectionReport'
import { dataPath } from '../../config.json'
import { getZip } from '../common/zipWriter';

// const getZip = buffers => {
//     writeFiles();
//     return `${buffers}`;
// }

const getReportFolderPath = (companyId) => `${dataPath}\\${companyId}\\hok_bank`;

const createReportFile = (companyId, date) =>
    (fileName) => getReportBuffer(companyId, date)
        .then(buffer => writeAllBytes(fileName, buffer));

const getReportFileBuffer = (filePath, createReportFileCurry) => {
    return pathExists(filePath)
        .then(isExists => {
            //  if (!isExists) {
            return createReportFileCurry(filePath);
            //  }
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
    return getReportFileBuffer(filePath, createReportFileCurry).then(buffer => {
        return { fileName, buffer }
    });
};

export const getReportFiles = (date, companyList) => {

    return Promise.all(companyList.map(companyId => {
        return getReportFile(date, companyId);
    }))
        .then(getZip);
};

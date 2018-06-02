
import xlsReader from '../common/xlsReader';
import { getCompanyList, getCompany } from './company';
import dateForamt from 'dateFormat'
import { dataPath } from '../../config.json'
import pdfReportConfig from '../resources/collectionReport/pdfConfig'
import { createPdf } from '../common/pdfCreator';
import { createHtml } from '../common/htmlCreator';
import { getFeeListByDate, getCompanyFeeByDate } from './fees';

const xlsMapping = {
    ' טלפון': 'telephone',
    ' תוכנית': 'program',
    ' מ.תוכנית': 'program',
    ' שם': 'name',
    ' מס\' חשבון': 'account',
    ' ת.הצטרפות': 'joinDate',
    ' ת.פתיחה': 'startDate',
    ' ת.סיום': 'endDate',
    ' ת.ביטול': 'cancelDate',
    ' סכום (ש"ח)': 'sum',
    ' סכום ($)': 'sumD',
    ' כתובת': 'address',
    ' עיר': 'city',
}

const mapReportData = (companyDetails, fee, collectionData) => {
  
    return {
        company: {
            name: companyDetails.companyName,
            address: companyDetails.address
        },
        dollarRate: fee.dollarRate,
        day: dateForamt(new Date(fee.date), "dd"),
        date: fee.date,
        month: dateForamt(new Date(fee.date), "mmmm yyyy"),
        data: collectionData.records.map(item => {
            item.account = item.account.split(" ").reverse().join(" ")
            item.startDate = item.startDate.substr(4);
            item.endDate = item.endDate.substr(4);
            item.sum = (Number(item.sum) + (Number(item.sumD) * Number(fee.dollarRate))).toFixed(2);
            return item;
        }),
        header: collectionData.headers,
        totalSum: fee.totalSum
    }
}

const getReportData = (companyKey, date) => {
        
    const collectionDatafilePath = `${dataPath}\\${companyKey}\\hok_bank\\XS${dateForamt(new Date(date), 'ddmmyy')}.XLS`;

    const getCompanyPromise = getCompany(companyKey);
    const getCompanyFeeByDatePromise = getCompanyPromise.then(company => getCompanyFeeByDate(company.code, date));   
    const getCollectionDataPromise = xlsReader.read(collectionDatafilePath, xlsMapping);

    return Promise.all([getCompanyPromise, getCompanyFeeByDatePromise, getCollectionDataPromise])
        .then(results => mapReportData(...results));

}

export const getReportBuffer = (companyKey, date) => {
    return getReportData(companyKey, date)
        .then(data => createHtml(data, './src/resources/collectionReport/template.html'))
        .then(html => createPdf(html, pdfReportConfig));
};


export const getCompanyListByReportDate = date => {
    const comapnyListPromise = getCompanyList(),
        feeListPromise = getFeeListByDate(date);

    return Promise.all([comapnyListPromise, feeListPromise]).then(results => {
        const [comapnyList, feeList] = results;
        return comapnyList.filter(company => feeList.some(fee => fee.companyCode == company.code))
    });
} 
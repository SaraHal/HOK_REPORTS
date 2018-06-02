
import dbfReader from '../common/dbfReader';
import { dataPath } from '../../config.json';
import dateForamt from 'dateFormat';

const dbfMapping = {
    "DATEGVI": "date",
    "MOSADNAME": "companyName",
    "CODNOSE": "companyCode",
    "SCUMGVI": "totalSum",
    "CAMUTGVI": "CAMUTGVI",
    "SCUMNEW": "SCUMNEW",
    "CAMUTNEW": "CAMUTNEW",
    "AMLGVI": "AMLGVI",
    "AMLNEW": "AMLNEW",
    "DOLAR": "dollarRate"
}
const handleGetFeeList = records => records.map(amla => {
    amla.companyName = amla.companyName && amla['companyName'].split('').reverse().join('')
    return amla;
});

const getFeeList = () => dbfReader.read(`${dataPath}\\AMLOT.DBF`, dbfMapping)
    .then(data => {
        return handleGetFeeList(data.records)
    });

export const getFeeListByDate = date => {
    return getFeeList().then(data => {
        return data.filter(fee => dateForamt(fee.date, 'dd/mm/yyyy') === dateForamt(new Date(date), 'dd/mm/yyyy'));
    })
};

export const getCompanyFeeByDate = (companyCode, date) => {
    return getFeeListByDate(date).then(data => data.find(fee => fee.companyCode == companyCode));
}
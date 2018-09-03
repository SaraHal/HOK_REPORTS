
import dbfReader from '../common/dbfReader';
import { dataPath } from '../../config.json';

const dbfMapping = {
    "COMPANY": "key",
    "COMPANYHEB": "name",
    "CODNOSE": "code",
    "ADRRES": "address",
    "YOMGVIA": 'collectionDate',
    "EMAIL":'email'
}

const handleGetCompanyList = records => {
    return records.map((company) => {
        company.name = company.name && company['name'].split('').reverse().join('');
        company.address = company.address && company['address'].split('').reverse().join('');
        company.isActive = company.collectionDate !== '88';
        return company;
    });
}

export const getCompanyList = () => {
    const filePath = `${dataPath}\\CONFIG.DBF`;
    return dbfReader.read(filePath, dbfMapping).then(data => {
        return handleGetCompanyList(data.records);
    });
}

export const getCompany = companyKey => {
    return getCompanyList().then(companyList => companyList.find(company => company.key == companyKey));

}

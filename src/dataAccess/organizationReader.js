
import dbfReader from '../common/dbfReader';
import { dataPath } from '../../config.json';

const dbfMapping = {
    "COMPANY": "key",
    "COMPANYHEB": "name",
    "CODNOSE": "code",
    "ADRRES": "address",
    "YOMGVIA": 'collectionDate',
    "EMAIL": 'email'
}

const handleGetOrganizations = records => {
    return records.map((company) => {
        company.name = company.name && company['name'].split('').reverse().join('');
        company.address = company.address && company['address'].split('').reverse().join('');
        company.isActive = company.collectionDate !== '88';
        return company;
    });
}


export default class OrganizationReader {

    constructor() {
        this.path = `${dataPath}\\CONFIG.DBF`;
    }

    getOrganizations() {
        return dbfReader.read(this.path, dbfMapping).then(data => {
            return handleGetOrganizations(data.records);
        });
    }

    getOrganization(key) {
        
        return this.getOrganizations()
            .then(organizations => {
        
                return organizations.find(organization => organization.key == key)
            });
    }
}



import dbfReader from '../common/dbfReader';
import { dataPath } from '../../config.json';

const dbfMapping = {
    "KOD": "key",
    "NAME": "name",
}


const handleGetProjects = records => {
    return records.map((project) => {
        project.name = program.name && program['name'].split('').reverse().join('');
        return project;
    });
}

export default class ProjectReader {

    constructor(organizationKey) {
        this.path = `${dataPath}\\${organizationKey}\\DESTENY.DBF`;
    }

    getProjects() {
        return dbfReader.read(this.path, dbfMapping).then(data => {
            return handleGetCompanyList(data.records);
        });
    }
}


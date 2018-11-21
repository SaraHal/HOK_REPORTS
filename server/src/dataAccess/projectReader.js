
import dbfReader from '../common/dbfReader';
import { dataPath } from '../../config.json';

const dbfMapping = {
    "KOD": "key",
    "NAME": "name",
}


const handleGetProjects = records => {
    return records.map((project) => {
        return Object.assign({}, project, {
            name: project.name && project['name'].split('').reverse().join('')
        })
    });
}

export default class ProjectReader {

    constructor(organizationKey) {
        this.path = `${dataPath}\\${organizationKey}\\DESTENY.DBF`;
    }



    getProjects() {
        return dbfReader.read(this.path, dbfMapping).then(data => {
            return handleGetProjects(data.records);
        });
    }


    getProject(projectKey) {
        return this.getProjects()
            .then(projects => projects
                .find(prj => prj.key === projectKey));
    }

}


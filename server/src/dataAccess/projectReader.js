
import dbfReader from '../common/dbfReader';
import { dataPath } from '../../config.json';

const dbfMapping = {
    "KOD": "key",
    "NAME": "name",
}


const handleGetProjects = (projects, mails) => {
    return projects.map((project) => {
        const mail = mails.find(mail => mail.key === project.key);
        return Object.assign({}, project, {
            name: project.name && project['name'].split('').reverse().join(''),
            email: mail && mail.name
        })
    });
}

export default class ProjectReader {

    constructor(organizationKey) {
        this.path = `${dataPath}\\${organizationKey}\\DESTENY.DBF`;
        this.mailPath = `${dataPath}\\${organizationKey}\\MAIL.DBF`;
    }



    getProjects() {
        const readProjectsPromise = dbfReader.read(this.path, dbfMapping);
        const readMailProjectsPromise = dbfReader.read(this.mailPath, dbfMapping);
        return Promise.all([readProjectsPromise, readMailProjectsPromise])
            .then(([projects, mails]) => {
                return handleGetProjects(projects.records, mails.records);
            });
    }


    getProject(projectKey) {
        return this.getProjects()
            .then(projects => projects
                .find(prj => prj.key === projectKey));
    }

}

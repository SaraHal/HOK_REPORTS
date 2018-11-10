
import dbfReader from '../common/dbfReader';
import { dataPath } from '../../config.json';

const dbfMapping = {
    "PAYNUM": "key",
    "LAKNUM": "customerKey",
    "PAYHESH": "banckAccount",
    "DATEJOIN": "joinDate",
    "DATEOPEN": "openDate",
    "DATECLOSE": "closeDate",
    "PAYSHEKEL": "sumShekel",
    "PAYDOLAR": "sumDollar",
    "PAYDESTENY": "projectKey",
}

//PAYNUM	LAKNUM	PAYHESH	DATEJOIN	DATEOPEN	DATECLOSE	DATECANCEL	CANCELCOSE	PAYSHEKEL	PAYDOLAR	
//MCHNUM	PAYCOSE	PAYDESTENY	PAYSTATUS	PAYREM	PAYNAME	PAYMAKAV	NORMALLATE	ISHURBANK	PAYPLACE	DATEMAKAV	PAYZACAUT2	PAYCITY	PAYKESHER



const handleGetPrograms = records => {
    return records.map((program) => {
        return program;
    });
}

export default class ProgramReader {

    constructor(organizationKey) {
        this.path = `${dataPath}\\${organizationKey}\\PAY.DBF`;
    }

    getPrograms() {
        return dbfReader.read(this.path, dbfMapping).then(data => {
            return handleGetPrograms(data.records);
        });
    }
}


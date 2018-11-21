import iconv from 'iconv-lite'
import { readAllBytes } from "./fileAsync";

const readFile = (filePath) => {
    return readAllBytes(filePath)
        .then(data => iconv.decode(data, 'win1255'));
}

const foramtHeader = (header, mapping) => {
    return header.reduce((accumulator, key, index) => {
        accumulator[mapping[key]] = key.trim();
        return accumulator;
    }, {});
}

const formatRows = (rows, header, mapping) => {
    return rows.map((row) => {
        return row.split('\t').reduce((accumulator, currentValue, currentIndex) => {
            accumulator[mapping[header[currentIndex]]] = currentValue.trim();
            return accumulator;
        }, {});
    });
}
const foramtData = (data, mapping) => {
    var rows = data.split('\n');
    var header = rows.splice(0, 1)[0].split('\t');
    return {
        headers: foramtHeader(header, mapping),
        records: formatRows(rows, header, mapping)
    };
}

const read = (filePath, mapping) => {
    return readFile(filePath).then(data => foramtData(data, mapping));
}
export default { read };


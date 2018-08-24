const service = (() => {
    const reportServiceAddress = '/reports/api';
    const handleException = response => {
        if (!response.ok) {
            throw Error(response.status);
        }
        return response;
    }

    const downloadFile = (file) => {
        const { fileName, buffer } = file;
        const blob = new Blob([new Uint8Array(buffer.data)]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
    }


    const getCompaniesByReportDate = (reportDate) => {
        var servicePath = `${reportServiceAddress}/company?date=${reportDate}`;
        return fetch(servicePath)
            .then(handleException)
            .then((response) => response.json());
    }

    const getReportFile = (companyKey, reportDate) => {
        var servicePath = `${reportServiceAddress}/${companyKey}?date=${reportDate}`;
        return fetch(servicePath)
            .then(handleException)
            .then(response => response.json())
            .then(downloadFile);


    }

    const getReportsZipFile = (companyKeyList, reportDate) => {
        var servicePath = `${reportServiceAddress}/?date=${reportDate}&companyList[]=${companyKeyList.join("&companyList[]=")}`;
        return fetch(servicePath)
            .then(handleException)
            .then(response => response.json())
            .then(buffer => downloadFile({ fileName: `${reportDate}_${new Date().toUTCString()}.zip`, buffer }));
    }
    return {
        getCompaniesByReportDate
        , getReportFile
        , getReportsZipFile
    }
})();
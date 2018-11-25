"use strict";

var service = function () {
  var reportServiceAddress = '/reports/api';

  var handleException = function handleException(response) {
    if (!response.ok) {
      throw Error(response.status);
    }

    return response;
  };

  var downloadFile = function downloadFile(file) {
    var fileName = file.fileName,
        content = file.content;
    var blob = new Blob([new Uint8Array(content.data)]);
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  };

  var getCompaniesByReportDate = function getCompaniesByReportDate(reportDate) {
    var servicePath = "".concat(reportServiceAddress, "/company?date=").concat(reportDate);
    return fetch(servicePath).then(handleException).then(function (response) {
      return response.json();
    });
  };

  var getReportFile = function getReportFile(companyKey, reportDate) {
    var servicePath = "".concat(reportServiceAddress, "/").concat(companyKey, "?date=").concat(reportDate);
    return fetch(servicePath).then(handleException).then(function (response) {
      return response.json();
    }).then(downloadFile);
  };

  var sendReportFile = function sendReportFile(companyKey, reportDate) {
    var servicePath = "".concat(reportServiceAddress, "/").concat(companyKey, "?date=").concat(reportDate);
    return fetch(servicePath, {
      method: 'POST'
    }).then(handleException).then(function (response) {
      return response.json();
    }).then(console.log);
  };

  var getReportsZipFile = function getReportsZipFile(companyKeyList, reportDate) {
    var servicePath = "".concat(reportServiceAddress, "/?date=").concat(reportDate, "&companyList[]=").concat(companyKeyList.join("&companyList[]="));
    return fetch(servicePath).then(handleException).then(function (response) {
      return response.json();
    }).then(function (content) {
      return downloadFile({
        fileName: "".concat(reportDate, "_").concat(new Date().toUTCString(), ".zip"),
        content: content
      });
    });
  };

  return {
    getCompaniesByReportDate: getCompaniesByReportDate,
    getReportFile: getReportFile,
    getReportsZipFile: getReportsZipFile,
    sendReportFile: sendReportFile
  };
}();
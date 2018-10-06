"use strict";

function Company(data) {
  var self = this;
  this.data = data;
  this.includeInZip = true;
  this.isDownloadingSingleReport = false;
  this.isSendingReport = false;
  this.errorDownloadingSingleReport = false;
  this.errorSendingReport = false;
  this.successSendingReport = false;

  this.downloadReport = function (reportDate) {
    self.isDownloadingSingleReport = true;
    self.errorDownloadingSingleReport = false;
    service.getReportFile(self.data.key, reportDate).catch(function (ex) {
      self.errorDownloadingSingleReport = true;
    }).finally(function () {
      self.isDownloadingSingleReport = false;
    });
  };

  this.sendReport = function (reportDate) {
    self.isSendingReport = true;
    self.errorSendingReport = false;
    service.sendReportFile(self.data.key, reportDate).then(function () {
      self.successSendingReport = true;
    }).catch(function (ex) {
      self.errorSendingReport = true;
    }).finally(function () {
      self.isSendingReport = false;
    });
  };
}
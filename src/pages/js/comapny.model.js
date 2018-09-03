function Company(data) {
    const self = this;
    this.data = data;
    this.includeInZip = true;
    this.isDownloadingSingleReport = false;
    this.isSendingReport = false;
    this.errorDownloadingSingleReport = false;
    this.errorSendingReport = false;
    this.successSendingReport = false;

    this.downloadReport = (reportDate) => {

        self.isDownloadingSingleReport = true;
        self.errorDownloadingSingleReport = false;
        service.getReportFile(self.data.key, reportDate)
            .catch(ex => {
                self.errorDownloadingSingleReport = true;
            }).finally(() => {
                self.isDownloadingSingleReport = false;
            });
    }

    this.sendReport = (reportDate) => {
        self.isSendingReport = true;
        self.errorSendingReport = false;
        service.sendReportFile(self.data.key, reportDate)
            .then(() => {
                self.successSendingReport = true;
            })
            .catch(ex => {
                self.errorSendingReport = true;
            }).finally(() => {
                self.isSendingReport = false;
            });
    }
}
import Organization from '../models/organization.model'
import CollectionReportService from '../services/collectionReport.service';
export default {
    data: function () {
        return {
            date: '2018-09-09',
            organizations: []
        }
    },
    methods: {
        getOrganizations(date) {
            this.date = date;
            return new CollectionReportService()
                .getOrganizations(date)
                .then(orgs => {
                    this.organizations = orgs;
                })
        }
    },
    render() {
        return <div>
            <date-picker change={this.getOrganizations} />
            <organizations organizations={this.organizations} reportDate={this.date} />
        </div>

    }
}
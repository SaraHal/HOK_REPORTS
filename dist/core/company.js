"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCompany = exports.getCompanyList = void 0;

var _dbfReader = _interopRequireDefault(require("../common/dbfReader"));

var _config = require("../../config.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbfMapping = {
  "COMPANY": "key",
  "COMPANYHEB": "name",
  "CODNOSE": "code",
  "ADRRES": "address",
  "YOMGVIA": 'collectionDate',
  "EMAIL": 'email'
};

var handleGetCompanyList = function handleGetCompanyList(records) {
  return records.map(function (company) {
    company.name = company.name && company['name'].split('').reverse().join('');
    company.address = company.address && company['address'].split('').reverse().join('');
    company.isActive = company.collectionDate !== '88';
    return company;
  });
};

var getCompanyList = function getCompanyList() {
  var filePath = "".concat(_config.dataPath, "\\CONFIG.DBF");
  return _dbfReader.default.read(filePath, dbfMapping).then(function (data) {
    return handleGetCompanyList(data.records);
  });
};

exports.getCompanyList = getCompanyList;

var getCompany = function getCompany(companyKey) {
  return getCompanyList().then(function (companyList) {
    return companyList.find(function (company) {
      return company.key == companyKey;
    });
  });
};

exports.getCompany = getCompany;
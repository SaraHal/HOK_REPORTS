"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHtml = void 0;

var _Mustache = _interopRequireDefault(require("Mustache"));

var _fileAsync = require("./fileAsync");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadTemplate = function loadTemplate(templatePath) {
  return (0, _fileAsync.readAllBytes)(templatePath, 'utf8');
};

var createHtml = function createHtml(data, templatePath) {
  return loadTemplate(templatePath).then(function (template) {
    return _Mustache.default.render(template, data);
  });
};

exports.createHtml = createHtml;
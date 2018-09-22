'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createHtml = undefined;

var _Mustache = require('Mustache');

var _Mustache2 = _interopRequireDefault(_Mustache);

var _fileAsync = require('./fileAsync');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadTemplate = function loadTemplate(templatePath) {
    return (0, _fileAsync.readAllBytes)(templatePath, 'utf8');
};
var createHtml = exports.createHtml = function createHtml(data, templatePath) {
    return loadTemplate(templatePath).then(function (template) {
        return _Mustache2.default.render(template, data);
    });
};
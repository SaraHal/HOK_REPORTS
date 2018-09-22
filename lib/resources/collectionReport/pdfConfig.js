"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dateFormat = require("dateFormat");

var _dateFormat2 = _interopRequireDefault(_dateFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return {
        "directory": "/tmp",
        "height": "10.5in",
        "width": "8in",
        "format": "A4",
        "orientation": "portrait",
        "border": {
            "top": "0in",
            "right": "0in",
            "bottom": "0.5in",
            "left": "0in"
        },
        "paginationOffset": 1,
        "header": {
            "height": "20mm",
            "contents": "<div class='pager'> \u05E2\u05DE\u05D5\u05D3 <span>{{page}}</span> \u05DE\u05EA\u05D5\u05DA <span>{{pages}} </span></div><br/>\n                    <div class='pager'> \u05EA.\u05D4\u05E4\u05E7\u05D4 " + (0, _dateFormat2.default)(new Date(), 'dd.mm.yy HH:MM:ss') + " </div>"
        }
    };
};
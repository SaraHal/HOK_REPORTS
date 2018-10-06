"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFormat = _interopRequireDefault(require("dateFormat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
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
      "contents": "<div class='pager'> \u05E2\u05DE\u05D5\u05D3 <span>{{page}}</span> \u05DE\u05EA\u05D5\u05DA <span>{{pages}} </span></div><br/>\n                    <div class='pager'> \u05EA.\u05D4\u05E4\u05E7\u05D4 ".concat((0, _dateFormat.default)(new Date(), 'dd.mm.yy HH:MM:ss'), " </div>")
    }
  };
};

exports.default = _default;
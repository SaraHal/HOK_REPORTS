"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _reportsRouter = _interopRequireDefault(require("./routes/reportsRouter"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use('/', _express.default.static(_path.default.join(__dirname, 'pages')));
app.use('/reports', _reportsRouter.default);
app.get('/', function (req, res) {
  return res.send('Hello World!');
}); // error handler

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});
app.listen(3000, function () {
  return console.log('app listening on port 3000!');
});
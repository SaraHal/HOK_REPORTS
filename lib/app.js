'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _reportsRouter = require('./routes/reportsRouter');

var _reportsRouter2 = _interopRequireDefault(_reportsRouter);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use('/', _express2.default.static(_path2.default.join(__dirname, 'pages')));

app.use('/reports', _reportsRouter2.default);

app.get('/', function (req, res) {
  return res.send('Hello World!');
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(3000, function () {
  return console.log('app listening on port 3000!');
});
var bodyParser          = require('body-parser')
const convertHandler    = require('./routes/api.js');

module.exports = function (app, db) {
  //Sample front-end
  app.route('/:project/')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/views/issue.html');
    });

  //Index page (static HTML)
  app.route('/')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/views/index.html');
    });
};
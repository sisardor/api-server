var dsConfig = require('../datasources.json');
var path = require('path');

module.exports = function(app) {
  var User = app.models.user;

  //login page
  app.get('/login', function(req, res) {
    var credentials = dsConfig.emailDs.transports[0].auth;
    res.render('pages/login', {
      email: credentials.user,
      password: credentials.pass
    });
  });

  // about page
  app.get('/about', function(req, res) {
      res.render('pages/about');
  });
  // index page
  app.get('/', function(req, res) {
      res.render('pages/index');
  });


};

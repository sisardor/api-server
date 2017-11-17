var dsConfig = require('../datasources.json');
var path = require('path');

module.exports = function(app) {
  var User = app.models.user;

  //login page
  app.get('/', function(req, res) {
    var credentials = dsConfig.emailDs.transports[0].auth;
    res.render('login', {
      email: credentials.user,
      password: credentials.pass
    });
  });


};

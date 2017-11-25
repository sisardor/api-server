var dsConfig = require('../datasources.json');
var path = require('path');
var Recaptcha = require('express-recaptcha');
//import Recaptcha from 'express-recaptcha'
var recaptcha = new Recaptcha('SITE_KEY', '6LdM3zkUAAAAAL1d8fzWMiEoSBA7iwFgxIc-2Fmp');
//or with options
// var recaptcha = new Recaptcha('SITE_KEY', 'SECRET_KEY', options);

module.exports = function(app) {
  var user = app.models.user;

  //login page
  app.get('/login', function(req, res) {
    var credentials = dsConfig.emailDs.transports[0].auth;
    res.render('pages/login', {
      email: credentials.user,
      password: credentials.pass
    });
  });

  app.post('/api/login', function(req, res) {
    if (!req.body) return res.sendStatus(400)

    user.login({
      email: req.body.email,
      password: req.body.password
    }, 'user', function(err, token) {
      if (err) {
        if(err.details && err.code === 'LOGIN_FAILED_EMAIL_NOT_VERIFIED'){
          if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            // send your xhr response here
            res.send({ fail: 'true' })
            return
          } else {
            res.render('reponseToTriggerEmail', {
              title: 'Login failed',
              content: err,
              redirectToEmail: '/api/users/'+ err.details.userId + '/verify',
              redirectTo: '/',
              redirectToLinkText: 'Click here',
              userId: err.details.userId
            });
          }
        } else {
          res.render('response', {
            title: 'Login failed. Wrong username or password',
            content: err,
            redirectTo: '/',
            redirectToLinkText: 'Please login again',
          });
        }
        return;
      }
      res.render('home', {
        email: req.body.email,
        accessToken: token.id,
        redirectUrl: '/api/users/change-password?access_token=' + token.id
      });
    });
  });

  //send an email with instructions to reset an existing user's password
  app.post('/request-password-reset', function(req, res, next) {
    User.resetPassword({
      email: req.body.email
    }, function(err) {
      if (err) return res.status(401).send(err);

      if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        res.send({
          title: 'Password reset requested',
          content: 'Check your email for further instructions',
          redirectTo: '/',
          redirectToLinkText: 'Log in'
        })
      }
      else {
        res.render('response', {
          title: 'Password reset requested',
          content: 'Check your email for further instructions',
          redirectTo: '/',
          redirectToLinkText: 'Log in'
        });
      }

    });
  });

  //show password reset form
  app.get('/reset-password', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    res.render('password-reset', {
      redirectUrl: '/api/users/reset-password?access_token='+
        req.accessToken.id
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

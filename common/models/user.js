'use strict';
var Recaptcha = require('express-recaptcha');
//import Recaptcha from 'express-recaptcha'
var recaptcha = new Recaptcha('SITE_KEY', '6LdM3zkUAAAAAL1d8fzWMiEoSBA7iwFgxIc-2Fmp');
module.exports = function(User) {
  //send verification email after registration
  User.observe('before save', function (ctx, next) {
    console.log(ctx)
    try {
      if (true) {
        throw {
          name: 'Access token error',
          message: 'Recaptcha note selected.',
          status: 401,
          statusCode: 401
        }
      }
    } catch (e) {
      return next(e)
    } finally {

    }
    next()
  })
  // User.afterRemote('create', function(context, user, next) {
  //   var options = {
  //     type: 'email',
  //     to: user.email,
  //     from: 'admin@atomex.io',
  //     subject: 'Thanks for registering.',
  //     template: path.resolve(__dirname, '../../server/views/verify.ejs'),
  //     redirect: '/verified',
  //     user: user
  //   };
  //
  //   user.verify(options, function(err, response) {
  //     if (err) {
  //       User.deleteById(user.id);
  //       return next(err);
  //     }
  //     context.res.render('response', {
  //       title: 'Signed up successfully',
  //       content: 'Please check your email and click on the verification link ' +
  //           'before logging in.',
  //       redirectTo: '/',
  //       redirectToLinkText: 'Log in'
  //     });
  //   });
  // });
};

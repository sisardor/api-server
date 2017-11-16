var bunyan = require('bunyan');
var logger = bunyan.createLogger({name: 'users.js'});

module.exports = function (app, cb) {
  var User = app.models.User
  var Role = app.models.Role
  const userData = [
    {username: 'sardor', firstName: 'Sardor', lastName: 'Isakov', avatar: 'https://s.gravatar.com/avatar/ac6144a2418ba3d7e3f199e5910abcda?s=80',
    email: 'sisakov@hydraulx.com', password: 'password'}
  ]

  User.count({}, function(err, count) {
    if (count > 0) {
      logger.warn('Users already provisioned.')
      return cb()
    }

    logger.info('Provisioning Users')

    User.create(userData, function (err, users) {
      if (err) {
        logger.error(err)
        return cb(err)
      }

      logger.info('Provisioned users.')

      // create the admin role
      Role.create({
        name: 'admin'
      }, function (err, role) {
        if (err) {
          logger.error(err)
          return cb(err)
        }
        logger.info('Created admin role.')
        process.nextTick(cb)
      })
    })
  })

}

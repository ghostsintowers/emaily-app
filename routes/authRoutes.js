const passport = require('passport');

// because we did not create the app object in this
module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  // app.get(
  //   '/auth/twitter',
  //   passport.authenticate('twitter', {
  //     scope: ['profile']
  //   })
  // );

  // app.get('/auth/twitter/callback', passport.authenticate('twitter'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
    console.log('user is logged out');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

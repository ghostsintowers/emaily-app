const passport = require('passport');

// because we did not create the app object in this
module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ hello: 'goodbye' });
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      console.log('logged in');
      res.redirect('/surveys');
    }
  );

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

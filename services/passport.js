const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// might try twitter again later - it currently needs reconfiguring to a regular domain name
// const TwitterStrategy = require('passport-twitter');
const mongoose = require('mongoose');

const keys = require('../config/keys');

// keeps this from reloading
const User = mongoose.model('users');

// encoding an ongoing user
// first argument is user model
// whenever user comes from oauth flow, either retrieves a user instance (an existingUser) or creates a new one
// profile and user ids are DIFFERENT
// generates an identifying piece of info, in this case we will use user.id
// second argument is done argument
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// pulls back out identifying info
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// creates a new instance of the Google Passport strategy
// tells google how to authenticate users in our application
// callback url is a route set up by us
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // make sure you only make one record per user in the database
      // does not return user directly, returns a promise
      const existingUser = await User.findOne({ googleId: profile.id });

      // existingUser is equal to null if they do not already exist
      if (existingUser) {
        // if we already have a record of user (they have logged in before)

        // tells strategy that we are done
        // takes 2 arguments, null means there was no error, second argument gives existing User
        done(null, existingUser);
      } else {
        // if we don't have a record of this user
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      }
    }
  )
);

// passport.use(
//   new TwitterStrategy(
//     {
//       consumerKey: keys.twitterAPIKey,
//       consumerSecret: keys.twitterAPISecret,
//       callbackURL: 'auth/twitter/callback'
//     },
//     (accessToken, refreshToken, profile, done) => {
//       User.findOneOrCreate({
//         twitterId: profile.id,
//         function(err, user) {
//           return done(err, user);
//         }
//       });
//     }
//   )
// );

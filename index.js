const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');
require('./models/Users');
require('./services/passport'); // this must come after models/Users because the file uses models/users

mongoose.connect(keys.mongoURI);

const app = express();

// config object expects 2 properties - maxAge (in ms), key to encrypt cookie
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// could separately require authRoutes using const authRoutes = require('./routes/authRoutes') and then call it using authRoutes(app);
// this is a more concise way of doing the same thing
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
console.log('Server is now running on port ' + PORT);
app.listen(PORT);

const mongoose = require('mongoose');
const { Schema } = mongoose; // destructuring, same as const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema); // tells mongoose we went to make a new collection called users using userSchema

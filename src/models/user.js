const mongoose = require("mongoose")
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  // email: {
  //   type: String,
  //   required: [true, 'user must have email'],
  //   unique: true,
  //   validate: [
  //     (email) => {
  //       emailRegexp.test(email)
  //     }, 'Please fill a valid email address'],
  //   match: [emailRegexp, 'Please fill a valid email address']
  // },
const messagesSchema = new mongoose.Schema({
  message: String,
  time: {type: Date, default: Date.now}
});
  
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cash: {
    type: Number,
    default: 1000
  },
  userType: {
    type: String,
    enum: ['admin', 'seller', 'user'],
    default: 'user'
  },
  notifications: [messagesSchema]
  
})

module.exports = mongoose.model('User', UserSchema)

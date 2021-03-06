const mongoose = require("mongoose")
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


const messagesSchema = new mongoose.Schema({
  message: String,
  time: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false }
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
  cash: {
    type: Number,
    min: [5, 'you can\'t have less than five dollars'],
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

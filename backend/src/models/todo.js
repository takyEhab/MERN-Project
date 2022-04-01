const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  todo: {
    type: String,
    required: 'todo can\'t be null'
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model('todo', todoSchema)

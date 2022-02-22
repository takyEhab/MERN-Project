const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
  todo: {
    type: String,
    required: true
  }, 
  created: {
    type: Date,
    required: true,
    default: Date.now()
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model('todo', todoSchema)

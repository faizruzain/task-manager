//const validator = require('validator')
const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
  desc: {
    type: String,
    require: true,
    trim: true
  }, 
  isComplete: {
    type: Boolean,
    default: false
  }
})

// compiling Task Schema to Model
const Task = mongoose.model('Task', TaskSchema)

module.exports = Task
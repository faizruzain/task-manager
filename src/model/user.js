const validator = require('validator')
const mongoose = require('mongoose')

// Users schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  age: {
    type: Number,
    require: true,
    validate: {
      validator: ((val) => {
        if (val < 0) {
          throw new Error('Age must be positive number!')
        }
      })
    },
    trim: true
  },
  email: {
    type: String,
    require: true,
    validate: {
      validator: ((val) => {
        return validator.isEmail(val)
      }),
      message: props => `${props.value} is invalid email`
    },
    trim: true
  },
  password: {
    type: String,
    require: true,
    trim: true,
    validate: {
      validator: ((val) => {
        if (val.length < 6) {
          throw new Error('your password must be 6 or more character')
        } else if (/password/i.test(val)) {
          throw new Error('password cannot contain "password"')
        }
      })
    }
  }
})

// compiling Schema to Model
const User = mongoose.model('User', UserSchema)

module.exports = User
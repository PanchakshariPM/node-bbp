const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email')
      }
    }
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    trim: true
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User

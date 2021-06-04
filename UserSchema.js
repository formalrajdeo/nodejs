const mongoose = require('mongoose')

const user = mongoose.Schema({
  firstname: String,
  lastname: String,
  address: String,
})

module.exports = mongoose.model('User', user)

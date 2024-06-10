const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  description: String,
  url: String,
  image: String,
})

const Model = mongoose.model('project', schema)

module.exports = Model

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  image: { type: String, required: true },
  ownerId: { type: String, required: true, index: true, immutable: true },
})

const Model = mongoose.model('project', schema)

module.exports = Model

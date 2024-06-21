const mongoose = require('mongoose')
require('dotenv').config()

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

async function connect() {
  mongoose.set('debug', true)
  try {
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@mongocluster.4hjigqt.mongodb.net/`
    )
    const db = mongoose.connection

    db.on('error', console.error.bind(console, 'connection error: '))

    if (db.readyState === 1) {
      console.log('Connected to the database.')
    }
  } catch (error) {
    console.log('catch:', error)
  }
}
module.exports = connect

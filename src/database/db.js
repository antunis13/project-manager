const mongoose = require('mongoose')
require('dotenv').config()

const dbName = process.env.DB_NAME

async function connect() {
  if (process.env.NODE_ENV === 'test') return
  try {
    await mongoose.connect(`mongodb://localhost:27017/${dbName}`)
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

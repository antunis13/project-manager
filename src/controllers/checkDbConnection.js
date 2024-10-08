const { MongoClient } = require('mongodb')
require('dotenv').config()

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

const url = `mongodb+srv://${user}:${password}@mongocluster.4hjigqt.mongodb.net/?retryWrites=true&w=majority&appName=MongoCluster`

async function checkDbConnection(req, res) {
  try {
    const client = new MongoClient(url)
    await client.connect()

    res.status(200).json({ message: 'Database connection established' })
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to the database', error })
  }
}
module.exports = {
  checkDbConnection,
}

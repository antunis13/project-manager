const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node')
const express = require('express')
const cors = require('cors')

const projectRoutes = require('../src/routes/projects')
const connect = require('../src/database/db')

connect()

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api', ClerkExpressRequireAuth(), projectRoutes)

module.exports = app

const express = require('express')
const cors = require('cors')

const connect = require('./database/db')

connect()

const app = express()

app.use(cors())

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`Listening on port ${port}`))

const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')
const express = require('express')
const cors = require('cors')
const path = require('path')

const projectRoutes = require('../src/routes/projects')
const connect = require('../src/database/db')

connect()

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api', ClerkExpressRequireAuth(), projectRoutes)

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: `
    .swagger-ui .topbar { display: none; }
  `,
    customSiteTitle: 'Project Manager API',
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
)

module.exports = app

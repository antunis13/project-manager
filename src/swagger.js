const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Manager API',
      version: '1.0.0',
      description: 'Project Manager API documentation',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec

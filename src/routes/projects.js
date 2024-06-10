const express = require('express')
const router = express.Router()

const ProjectsController = require('../controllers/projects')

router.get('/projects', ProjectsController.get)

module.exports = router

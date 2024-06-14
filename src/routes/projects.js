const express = require('express')
const router = express.Router()

const ProjectsController = require('../controllers/projects')

router.get('/projects/:id?', ProjectsController.get)
router.post('/projects', ProjectsController.post)
router.put('/projects/:id', ProjectsController.put)

module.exports = router

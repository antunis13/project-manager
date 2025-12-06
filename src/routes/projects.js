const express = require('express')
const router = express.Router()

const ProjectsController = require('../controllers/projects')
const { upload } = require('../middleware/fileStorage.js')

router.get('/projects', ProjectsController.get)
router.post('/projects', upload.single('image'), ProjectsController.post)
router.put('/projects/:id', ProjectsController.put)
router.delete('/projects/:id', ProjectsController.remove)

module.exports = router

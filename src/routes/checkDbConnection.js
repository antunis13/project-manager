const express = require('express')
const router = express.Router()

const DbController = require('../controllers/checkDbConnection')

router.get('/checkDbConnection', DbController.checkDbConnection)

module.exports = router

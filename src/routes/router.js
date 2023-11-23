const router = require('express').Router()
const authController = require('./authRoutes')

router.use('/', authController)

module.exports = router
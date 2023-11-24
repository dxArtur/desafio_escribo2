const router = require('express').Router()
const authController = require('./authRoutes')
const userController = require('./userRoutes')

router.use('/', authController)
router.use('/', userController)

module.exports = router
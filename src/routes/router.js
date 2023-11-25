const router = require('express').Router()
const verificarEndpoint = require('../middleware/verificadorEndpoint')
const authController = require('./authRoutes')
const userController = require('./userRoutes')

router.use('/', verificarEndpoint, authController)
router.use('/', verificarEndpoint, userController)

module.exports = router
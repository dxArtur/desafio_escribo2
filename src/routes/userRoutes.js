const router = require('express').Router()
const userController = require('../controllers/userController')
const verificarToken = require('../middleware/verificadorToken')

router.get('/seeInfo', verificarToken, userController.getInfo)

module.exports = router
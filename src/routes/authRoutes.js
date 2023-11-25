const router = require('express').Router()
const authController = require('../controllers/authController')
const verificarJson = require('../middleware/verificadorJson')
//const verificarEndpoint = require('../middleware/verificadorEndpoint')

router.post('/signin',  verificarJson,  authController.signIn)
router.post('/signup',  verificarJson, authController.signUp)


module.exports = router
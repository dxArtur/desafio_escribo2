const router = require('express').Router()
const authController = require('../controllers/authController')
const jwt = require('jsonwebtoken')

router.post('/signin', authController.signIn)
router.post('/signup', authController.signUp)
router.get('/jwt', ()=>{
	const id= '6dd022c9-6beb-4454-a65f-be5a9e8990a1'
	const token = jwt.sign({ id: id }, 'escribo')
    console.log(token)
})

module.exports = router
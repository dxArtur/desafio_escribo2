const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/router')

const app = express()

app.use(bodyParser.json())

app.use('/api', routes)

// eslint-disable-next-line no-unused-vars
app.use((_req, res, _next) => {
	res.status(404).json({ mensagem: 'Endpoint não encontrado, esses são nossos endpoints: /api/signin, /api/signup, /api/seeInfo' })
})


app.listen(3333, () => {
	console.log('Servidor rodando na porta 3333')
})
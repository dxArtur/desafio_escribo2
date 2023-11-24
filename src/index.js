const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/router')

const app = express()

app.use(bodyParser.json())

app.use('/api', routes)

app.use((req, res, next) => {
    res.status(404).json({ mensagem: 'Endpoint não encontrado, esses são nossos endpoints: /api/signin, /api/signup, /api/seeInfo' })
  })

app.listen(3333, () => {
    console.log(`Servidor rodando na porta 3333`)
})
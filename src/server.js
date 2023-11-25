require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/router')

const app = express()

app.use(bodyParser.json())
app.use('/api', routes)

// eslint-disable-next-line no-unused-vars



module.exports = app
/* eslint-disable no-undef */
const app = require('./server')

app.listen(process.env.PORT, () => {
	console.log('Servidor rodando na porta 3333')
})
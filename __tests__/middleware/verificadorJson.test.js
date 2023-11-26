/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../src/server')
const userMock = require('../userMock.json')

describe('Middleware verificarJson', () => {
	it('Deve retornar 401 se a requisição POST não for JSON', async () => {
		const response = await request(app)
			.post('/api/signin') 
			.set('Content-Type', 'text/plain')
			.send('email: emailtestedodaniel@example.com, senha: senha123')
    
		expect(response.status).toBe(415)
		expect(response.body).toEqual({
			mensagem: 'Suportamos apenas json, utilize application/json',
		})
	}),

	it('Deve chamar next se a requisição for válida', async () => {
		const usuarioValido = {... userMock}
		const {email, senha} = usuarioValido
		const response = await request(app)
			.post('/api/signin')
			.set('Content-Type', 'application/json')
			.send({ email, senha})
    
		expect(response.status).not.toBe(415)
	})

})
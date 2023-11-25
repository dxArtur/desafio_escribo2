/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../src/server')
const userMock = require('../userMock.json')

describe('Middleware verificarEndpoint', () => {
	it('Deve retornar 404 e a mensagem personalizada', async () => {
		const response = await request(app).get('/api/rota-inexistente')

		expect(response.status).toBe(404)
		expect(response.body).toEqual({ mensagem: 'Endpoint não encontrado, esses são nossos endpoints: /api/signin, /api/signup, /api/seeInfo' })
	}),

	it('Deve chamar o próximo middleware se o endpoint existir', async () => {
		const usuarioValido = {... userMock}
		const {email, senha} = usuarioValido
		const response = await request(app).post('/api/signin')
			.send({email, senha})

		expect(response.status).not.toBe(404)
	})

})
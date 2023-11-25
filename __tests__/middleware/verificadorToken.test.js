/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../src/server')
const userMock = require('../userMock.json')
const tokenMock = require('../tokenMock.json')


describe('Middleware verificarToken', () => {
	it('Deve retornar 401 e a mensagem personalizada se o token não estiver presente nos cabeçalhos', async () => {
		const response = await request(app)
			.get('/api/seeInfo')
			.set('Authentication', '')
		expect(response.status).toBe(401)
		expect(response.body).toEqual({ mensagem: 'Não autorizado' })
	}),

	it('Deve retornar a mensagem personalizada se o token for inválido', async () => {
		const {token_invalido} = {...tokenMock}
		const response = await request(app)
			.get('/api/seeInfo')
			.set('Authentication', `Bearer ${token_invalido}`)
    
		expect(response.body).toEqual({ mensagem: 'Não autorizado' })
	}),

	it('Deve retornar a mensagem personalizada quando o token for expirado', async () => {
		const {token_expirado} = {...tokenMock}
		const response = await request(app)
			.get('/api/seeInfo')
			.set('Authentication', `Bearer ${token_expirado}`)
    
		
		expect(response.body).toEqual({ mensagem: 'Sessão inválida' })
	}),

	it('Deve chamar o next quando o token for válido', async () => {
		const {email, senha} = {...userMock}
		const responseAuth = await request(app)
			.post('/api/signin')
			.send({ email, senha})
		const token = responseAuth.body.token

    
		const response = await request(app)
			.get('/api/seeInfo')
			.set('Authentication', `Bearer ${token}`)
    
		
		expect(response.status).not.toBe(401)
	})
})
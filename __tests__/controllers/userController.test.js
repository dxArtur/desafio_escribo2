/* eslint-disable quotes */
/* eslint-disable no-undef */

const request = require('supertest')
const app = require('../../src/server')
const jwt = require('jsonwebtoken')
const userMock = require('../userMock.json')
const tokenMock = require('../tokenMock.json')


describe('getInfo', () => {
	it('token invalido', async()=>{
		const {token_invalido} = {...tokenMock}
		//const tokenInvalido = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImlkSW52YWxpZG8iLCJpYXQiOjE3MDA4ODAxOTgsImV4cCI6MTcwMTk4MTk5OH0.TOhXsSyM33DHe8lUmd-VwoBt8AR9F_sVttEhvupDClM'
		const response = await request(app).get('/api/seeInfo')
			.set('Authentication', `Bearer ${token_invalido}`)

		expect(response.body).toEqual({ mensagem: 'Não autorizado' })
	}),

	it('token expirado', async()=>{
		const {token_expirado} = {...tokenMock}
		//const tokenExpirado = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZkZDAyMmM5LTZiZWItNDQ1NC1hNjVmLWJlNWE5ZTg5OTBhMSIsImlhdCI6MTcwMDkzMTM4OSwiZXhwIjoxNzAwOTMxNzU5fQ.b0DdiuJbJ6yfnfx97gT3UvTtwfU866PTxzZCfahYKKE'
		const response = await request(app).get('/api/seeInfo')
			.set('Authentication', `Bearer ${token_expirado}`)

		expect(response.body).toEqual({ mensagem: 'Sessão inválida' })
	}),

	it('token valido', async()=>{
		const {id, nome, email, telefones} = {...userMock}
		const tokenValido = jwt.sign({id: id}, process.env.SECRET, {expiresIn: '30m'})
		const response = await request(app).get('/api/seeInfo')
			.set('Authentication', `Bearer ${tokenValido}`)
		
		expect(response.body).toEqual({"id": id, "nome": nome, "email": email, "telefones": telefones})
	})
	
})
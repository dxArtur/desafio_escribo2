/* eslint-disable quotes */
/* eslint-disable no-undef */

const request = require('supertest')
const app = require('../../server')
const userMock = require('../userMock.json')


describe('getInfo', () => {

	it('token invalido', async()=>{

		const tokenInvalido = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImlkSW52YWxpZG8iLCJpYXQiOjE3MDA4ODAxOTgsImV4cCI6MTcwMDg4MTk5OH0.tDBhTI3d4gLn5YvrC00DGSThTWPVAXjFS9DSRdFwkWw'
		const response = await request(app).get('/api/seeInfo')
			.set('Authentication', `Bearer ${tokenInvalido}`)

		expect(response.body).toEqual({ mensagem: 'Não autorizado' })
	}),

	it('token expirado', async()=>{

		const tokenExpirado = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImlkSW52YWxpZG8iLCJpYXQiOjE3MDA4ODAxOTgsImV4cCI6MTcwMDg4MDE5OX0.OCe9H2thLSw7l8MOBS0yjLmvDp1DAYlApkzuBtbAqY0'
		const response = await request(app).get('/api/seeInfo')
			.set('Authentication', `Bearer ${tokenExpirado}`)

		expect(response.body).toEqual({ mensagem: 'Não autorizado' })
	}),

	it('token valido', async()=>{
		const {id, nome, email, telefones} = {...userMock}
		const tokenValido = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZkZDAyMmM5LTZiZWItNDQ1NC1hNjVmLWJlNWE5ZTg5OTBhMSIsImlhdCI6MTcwMDg4NjU5MywiZXhwIjoxNzAxMzg2NTkzfQ.-0Jx8dX7YzR5i8su1OcWnQKsao3nw8MeNMJ5DXBRNPg'
		const response = await request(app).get('/api/seeInfo')
			.set('Authentication', `Bearer ${tokenValido}`)
		
		expect(response.body).toEqual({"id": id, "nome": nome, "email": email, "telefones": telefones})
	})
	
})
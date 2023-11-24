/* eslint-disable no-undef */

const authController = require('../controllers/authController')
jest.mock('../db/repositoryClient', ()=> require('./prismaMock'))
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { describe } = require('node:test')




describe('signIn', () => {
	afterEach(() => {
		jest.resetAllMocks()
	})

	describe('signIn', ()=>{

        
		it('should sign in user with valid credentials', async () => {
			const req = { body: { email: 'test@example.com', senha: 'password' } }
			const res = {
				json: jest.fn(),
				status: jest.fn(() => res),
			}
      
			prisma.user.findFirst.mockResolvedValue({
				id: 1,
				data_criacao: '2023-01-01T00:00:00Z',
				data_atualizacao: '2023-01-01T00:00:00Z',
				ultimo_login: '2023-01-01T00:00:00Z',
				senha: 'hashedPassword',
			})
      
			bcrypt.compareSync.mockReturnValue(true)
      
			jwt.sign.mockReturnValue('token')
      
			await authController.signIn(req, res)
      
			expect(res.status).not.toHaveBeenCalled()
			expect(res.json).toHaveBeenCalledWith({
				id: 1,
				data_criacao: '2023-01-01T00:00:00Z',
				data_atualizacao: '2023-01-01T00:00:00Z',
				ultimo_login: '2023-01-01T00:00:00Z',
				token: 'token',
			})
		})
            
		// Adicione mais casos de teste conforme necessário
	})
})
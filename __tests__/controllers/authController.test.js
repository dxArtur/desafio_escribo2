/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable no-undef */


const request = require('supertest')
const app = require('../../src/server')
const userMock = require('../userMock.json')
const { prisma } = require('../../src/db/repositoryClient')


describe('signIn', () => {

	it('Senha invalida retornara 401', async () => {
		const usuarioSenhaInvalida = {...userMock}
		usuarioSenhaInvalida.senha = 'senhaerrada123'
		const {email, senha} = usuarioSenhaInvalida
		const response = await request(app).post('/api/signin')
			.send({email, senha})

		expect(response.status).toBe(401)
		expect(response.body).toEqual({ mensagem: 'Usuário e/ou senha inválidos' })

	}),

	it('Email invalido retornara messagem de erro', async()=>{
		const usuarioEmailInvalido = {...userMock}
		usuarioEmailInvalido.email = 'emailinvalidol@example.com'
		const {email, senha} = usuarioEmailInvalido
		const response = await request(app).post('/api/signin')
			.send({email, senha})

		expect(response.body).toEqual({ mensagem: 'Usuário e/ou senha inválidos' })

	}),

	it('Autenticacao com sucesso ', async()=>{
		const usuarioValido = {... userMock}
		const {email, senha} = usuarioValido
		const response = await request(app).post('/api/signin')
			.send({email, senha})

		expect(response.status).toBe(200)
		expect(response.body).toEqual({
			id: expect.any(String),
			data_criacao: expect.any(String),
			data_atualizacao: expect.any(String),
			ultimo_login: expect.any(String),
			token: expect.any(String),
		})
	})

})



describe('signUp', () => {
	beforeEach(async ()=>{
		const usuarioJaCadastrado = await prisma.user.findFirst({
			where:{
				email:'emailNovoUsuario@example.com'
			}
		})

		if (usuarioJaCadastrado) {
			await prisma.user.delete({
				where: {
					id: usuarioJaCadastrado.id
				}
			})
		}
	})

	it('Email ja cadastrado', async () => {
		const usuarioJaCadastrado = {...userMock}
		const response = await request(app).post('/api/signup')
			.send(usuarioJaCadastrado)

		expect(response.body).toEqual({ mensagem: 'E-mail já existente' })

	}),

	it('Criacao de cadastro c/ sucesso', async()=>{
		const usuarioParaCadastro = {...userMock}
		usuarioParaCadastro.email = 'emailNovoUsuario@example.com'
		const {nome, email, senha, telefones } = usuarioParaCadastro
		const response = await request(app).post('/api/signup')
			.send({nome, email, senha, telefones})
		
		expect(response.status).toBe(201)
		expect(response.body).toEqual({
			id: expect.any(String),
			data_criacao: expect.any(String),
			data_atualizacao: expect.any(String),
			ultimo_login: null,
			token: expect.any(String),
		})

	})


	/*
	Esses foram os únicos testes feitos pois eram apenas esses
	os que pedem no documento, mas cabem mais a ser testado
	*/
})
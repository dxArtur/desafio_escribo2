/* eslint-disable no-undef */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {prisma} = require('../db/repositoryClient')
const {HTTP_STATUS_SUCESS, HTTP_STATUS_ERROR_CLIENT, HTTP_STATUS_ERROR_SERVER} = require('../constants/apiStatusResponse')
const { ERROR_CLIENT_MESSAGES, ERROR_SERVER_MESSAGES } = require('../constants/apiMensagensResponse')

async function signIn(req, res) {
	try {
		const { email, senha } = req.body
		const usuario = await prisma.user.findFirst({
			where:{
				email: email
			}
		})

		if (!usuario) {
			return res.json({ mensagem: ERROR_CLIENT_MESSAGES.BAD_AUTH })
		}
        
		if (! (bcrypt.compareSync(senha, usuario.senha))) {
			return res.status(HTTP_STATUS_ERROR_CLIENT.UNAUTHORIZED).json({ mensagem: ERROR_CLIENT_MESSAGES.BAD_AUTH })

		}

		const {
			id, 
			data_criacao,
			data_atualizacao, 
			ultimo_login,
		} = usuario

		const data_criacao_br = data_criacao ? data_criacao.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}) : null
		const data_atualizacao_br = data_atualizacao ? data_atualizacao.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}) : null
		const ultimo_login_br = ultimo_login ? ultimo_login.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}) : null
        
		const token = jwt.sign({ id: usuario.id }, process.env.SECRET, { expiresIn: '30m' })
		await prisma.user.update({
			where:{
				id: usuario.id
			},
			data:{
				ultimo_login: new Date()
			}
		})
        

		return res.status(HTTP_STATUS_SUCESS.OK).json({'id':id, 'data_criacao':data_criacao_br, 'data_atualizacao':data_atualizacao_br, 'ultimo_login':ultimo_login_br, 'token':token})
	} catch (error) {
		return res.status(HTTP_STATUS_ERROR_SERVER.INTERNAL_SERVER_ERROR).json({mensagem: ERROR_SERVER_MESSAGES.INTERNAL_ERROR_SERVER})
	}
}

async function signUp(req, res){
	try {
		const { nome, email, senha, telefones } = req.body
        
		const verificarEmailCadastrado =  await prisma.user.findFirst({
			where: {
				email: email
			}
		})

		if (!verificarEmailCadastrado) {
			const senhaCriptada = bcrypt.hashSync(senha, Number(process.env.SALT))
			const usuarioCriado = await prisma.user.create({
				data:{
					nome,
					email,
					senha: senhaCriptada,
					telefones: {
						create: telefones.map((telefone) => ({
							numero: telefone.numero,
							ddd: telefone.ddd,
						})),
					}
				}
			})
            
			if ( usuarioCriado) {
				const token = jwt.sign(
					{
						id:usuarioCriado.id
					},
					process.env.SECRET,
					{
						expiresIn:'30m'
					}
				)
				const {id, data_criacao, data_atualizacao, ultimo_login} = usuarioCriado

				const data_criacao_br = data_criacao ? data_criacao.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}) : null
				const data_atualizacao_br = data_atualizacao ? data_atualizacao.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}) : null
				const ultimo_login_br = ultimo_login ? ultimo_login.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}) : null

				return res.status(HTTP_STATUS_SUCESS.CREATED).json({'id':id, 'data_criacao':data_criacao_br, 'data_atualizacao':data_atualizacao_br, 'ultimo_login':ultimo_login_br, 'token':token})
			}
		}


        
		return res.json({mensagem: ERROR_CLIENT_MESSAGES.EMAIL_HAS_USED})

	} catch (error) {
		return res.status(HTTP_STATUS_ERROR_SERVER.INTERNAL_SERVER_ERROR).json({mensagem: ERROR_SERVER_MESSAGES.INTERNAL_ERROR_SERVER})
	}
}

module.exports = { signIn, signUp }
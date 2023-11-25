/* eslint-disable no-undef */
const jwt = require('jsonwebtoken')
const { HTTP_STATUS_ERROR_CLIENT } = require('../constants/apiStatusResponse')
const { TOKEN_ERROR_MESSAGES } = require('../constants/apiMensagensResponse')

function verificarToken(req, res, next) {
	const header = req.headers.authentication

	if (!header) {
		return res.status(HTTP_STATUS_ERROR_CLIENT.UNAUTHORIZED).json({ mensagem: TOKEN_ERROR_MESSAGES.INVALID_TOKEN })
	}

	const token = header.split(' ')[1]

	try {
		const {id, exp} = jwt.verify(token, process.env.SECRET)
		
		if (Date.now() >= exp * 1000) {
			return res.json({mensagem: TOKEN_ERROR_MESSAGES.EXPIRED_TOKEN})
		}
		req.user = {
			id: id
		}
		next()
	} catch (error) {
		console.log(error)
		if (error.name === 'TokenExpiredError') {
			return res.json({mensagem: TOKEN_ERROR_MESSAGES.EXPIRED_TOKEN})
		}
		return res.json({ mensagem: TOKEN_ERROR_MESSAGES.INVALID_TOKEN })
	}
}

module.exports = verificarToken
const {HTTP_STATUS_ERROR_CLIENT} = require('../constants/apiStatusResponse')
const { ERROR_CLIENT_MESSAGES } = require('../constants/apiMensagensResponse')

function verificarJson(req, res, next){
	res.setHeader('Content-Type', 'application/json')

	if (['POST'].includes(req.method)&& req.headers['content-type'] !== 'application/json') {
		return res.status(HTTP_STATUS_ERROR_CLIENT.UNSUPPORTED_MEDIA_TYPE).json({ mensagem: ERROR_CLIENT_MESSAGES.ONLY_ACCEPT_JSON })
	}

	next()
}

module.exports = verificarJson
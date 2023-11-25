const { HTTP_STATUS_ERROR_CLIENT } = require('../constants/apiStatusResponse')
const { ERROR_CLIENT_MESSAGES } = require('../constants/apiMensagensResponse')
const ENDPOINTS = require('../constants/apiEndpoints')

function verificarEndpoint(req, res, next){
	const endpointExistente = Object.values(ENDPOINTS).includes(req.path)

	if (endpointExistente) {		
		next()
	} else {
		res.status(HTTP_STATUS_ERROR_CLIENT.NOT_FOUND).json({ mensagem: ERROR_CLIENT_MESSAGES.NOT_FOUND_ENDPOINT })
	}

}

module.exports = verificarEndpoint
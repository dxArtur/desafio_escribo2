const ERROR_SERVER_MESSAGES = {
	INTERNAL_ERROR_SERVER : 'ERRO INTERNO DO SERVIDOR'
}

const ERROR_CLIENT_MESSAGES = {
	BAD_AUTH : 'Usuário e/ou senha inválidos',
	EMAIL_HAS_USED: 'E-mail já existente',
	NOT_FOUND_ENDPOINT: 'Endpoint não encontrado, esses são nossos endpoints: /api/signin, /api/signup, /api/seeInfo',
	ONLY_ACCEPT_JSON: 'Suportamos apenas json, utilize application/json'
}

const TOKEN_ERROR_MESSAGES = {
	INVALID_TOKEN : 'Não autorizado',
	EXPIRED_TOKEN : 'Sessão inválida',
}



module.exports = {ERROR_SERVER_MESSAGES, ERROR_CLIENT_MESSAGES, TOKEN_ERROR_MESSAGES}
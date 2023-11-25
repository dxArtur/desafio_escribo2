const HTTP_STATUS_SUCESS = {
	OK: 200,
	CREATED: 201,
}

const HTTP_STATUS_ERROR_CLIENT = {
	UNAUTHORIZED: 401,
	NOT_FOUND:404,
	UNSUPPORTED_MEDIA_TYPE: 415,
}

const HTTP_STATUS_ERROR_SERVER = {
	INTERNAL_SERVER_ERROR: 500,
}

module.exports = {HTTP_STATUS_SUCESS, HTTP_STATUS_ERROR_CLIENT, HTTP_STATUS_ERROR_SERVER}
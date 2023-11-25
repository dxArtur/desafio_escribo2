const { TOKEN_ERROR_MESSAGES, ERROR_SERVER_MESSAGES } = require('../constants/apiMensagensResponse')
const { HTTP_STATUS_ERROR_SERVER } = require('../constants/apiStatusResponse')
const {prisma} = require('../db/repositoryClient')

async function getInfo(req, res) {
	try {

		const usuario = await prisma.user.findUnique({
			where:{
				id: req.user.id
			},
			select:{
				id:true,
				nome:true,
				email:true,
				telefones: {
					select: {
						numero: true,
						ddd: true
					}
				}
			}
		})

		if (!usuario) {
			return res.json({mensagem: TOKEN_ERROR_MESSAGES.INVALID_TOKEN})
		}

		return res.json(usuario)
	} catch (error) {
		return res.status(HTTP_STATUS_ERROR_SERVER.INTERNAL_SERVER_ERROR).json({mensagem: ERROR_SERVER_MESSAGES.INTERNAL_ERROR_SERVER})
	}
}


module.exports={getInfo}
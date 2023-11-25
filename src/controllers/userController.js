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
			return res.json({mensagem: 'Não autorizado'})
		}

		return res.json(usuario)
	} catch (error) {
		console.log(error)
	}
}


module.exports={getInfo}
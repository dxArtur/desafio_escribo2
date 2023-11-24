const prisma = require('../db/prismaClient')

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
                        ddd: true,
                        numero: true
                    }
                }
            }
        })
        return res.json(usuario)
    } catch (error) {
        console.log(error)
    }
}


module.exports={getInfo}
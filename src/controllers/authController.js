const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../db/prismaClient')


async function signIn(req, res) {
    try {
        const { email, senha } = req.body
        const usuario = await prisma.user.findFirst({
            where:{
                email: email
            }
        })

        if (!usuario) {
            return res.json({ mensagem: 'Usuário e/ou senha inválidos' })
        }
        
        if (! (bcrypt.compareSync(senha, usuario.senha))) {
            return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' })

        }

        const {id, data_criacao, data_atualizacao, ultimo_login} = usuario
        
        
        const token = jwt.sign({ id: usuario.id }, process.env.SECRET, { expiresIn: '30m' })
        const atualizarLogin = await prisma.user.update({
            where:{
                id: usuario.id
            },
            data:{
                ultimo_login: new Date()
            }
        })
        

        return res.json({id, data_criacao, data_atualizacao, ultimo_login, token})
    } catch (error) {
        return res.json({ mensagem: 'Usuário e/ou senha inválidos' })    }
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
            console.log(senhaCriptada)
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
                return res.status(201).json({id, data_criacao, data_atualizacao, ultimo_login, token})
            }
        }


        
        return res.json({mensagem: "E-mail já existente"})

    } catch (error) {
        console.log(error)
    }
}

module.exports = { signIn, signUp }
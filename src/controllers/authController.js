const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../db/prismaClient')


async function signIn(req, res) {
    try {
        const { email, senha } = req.body
        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })

        if (!user) {
            return res.json({ mensagem: 'Usuário e/ou senha inválidos' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
        }

        const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao autenticar usuário' });
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

        if (verificarEmailCadastrado) {
            res.json({mensagem: "E-mail já existente"})
        }

        const usuarioCriado = await prisma.user.create({
            data:{
               nome,
               email,
               senha,
               telefones: {
                create: telefones.map((telefone) => ({
                  numero: telefone.numero,
                  ddd: telefone.ddd,
                })),
              }
            }
        })
        
        if ( usuarioCriado) {
            res.status(201).json({usuarioCriado})
        }

        res.json({mensagem: "erro ao criar usuario"})

    } catch (error) {
        console.log(error)
    }
}

module.exports = { signIn, signUp }
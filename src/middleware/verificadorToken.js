const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ mensagem:'Não autorizado' });
    }

    const token = header.split(" ")[1]

    try {
        const {id, iat} = jwt.verify(token, process.env.SECRET)
        const agoraEmSegundos = Math.floor(Date.now()/1000)

        const trintaMinutosEmSegundos = 1800

        if (agoraEmSegundos - iat > trintaMinutosEmSegundos) {
            return res.json({mensagem: 'Sessão inválida'})
        }
        req.user = {
            id: id
        }
        next()
    } catch (error) {
        return res.json({ mensagem: 'Não autorizado' });
    }
}

module.exports = verificarToken
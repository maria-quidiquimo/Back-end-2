const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'chave_super_secreta_sabor_digital_123';

function verificarToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ mensagem: 'Token inválido' });
    }
}

function verificarAdmin(req, res, next) {
    if (req.usuario && req.usuario.papel === 'admin') {
        next();
    } else {
        return res.status(403).json({ mensagem: 'Acesso negado: apenas admin' });
    }
}

module.exports = { verificarToken, verificarAdmin };
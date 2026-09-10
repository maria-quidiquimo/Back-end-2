// =========================================================================
// AVALIACAO: IMPLEMENTACAO DE JWT
// =========================================================================
// As logicas abaixo foram retiradas do sistema.
// Seu objetivo e analisa-las, entender em quais arquivos e camadas
// elas se encaixam e recoloca-las no local correto da arquitetura 
// para fazer o sistema de autenticacao e rotas protegidas voltar a funcionar.
// =========================================================================


function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Token com formato inválido' });
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token mal formatado' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido ou expirado' });
        }
        req.usuarioId = decoded.id;
        req.usuarioEmail = decoded.email;
        req.usuarioPapel = decoded.papel;
        return next();
    });
}


//--------------------------------------------------------------------------------------

const { authMiddleware, authAdminMiddleware } = require('../middlewares/authMiddleware');

//--------------------------------------------------------------------------------------

async login(email, senha) {
    if (!email || !senha) {
        throw new Error('E-mail e senha são obrigatórios');
    }
    const usuario = await UsuarioRepository.buscarPorEmail(email);
    if (!usuario) {
        throw new Error('Credenciais inválidas');
    }
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
        throw new Error('Credenciais inválidas');
    }
    const token = jwt.sign(
        { id: usuario.id, email: usuario.email, papel: usuario.papel },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return {
        token,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    };
}

//--------------------------------------------------------------------------------------

function authAdminMiddleware(req, res, next) {
    if (req.usuarioPapel !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem executar esta ação.' });
    }
    next();
}


//--------------------------------------------------------------------------------------

async registrar(dadosUsuario) {
    const { nome, email, senha } = dadosUsuario;
    if (!nome || !email || !senha) {
        throw new Error('Nome, e-mail e senha são obrigatórios');
    }
    const usuarioExistente = await UsuarioRepository.buscarPorEmail(email);
    if (usuarioExistente) {
        throw new Error('E-mail já cadastrado');
    }
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    const id = await UsuarioRepository.criar({ nome, email, senha: senhaHash });
    return { id, nome, email };
}


// =========================================================================
// ATIVIDADE 2: PROTEÇÃO DE ROTAS
// =========================================================================
// As rotas de listagem (GET /) e exclusão (DELETE /:id)
// atualmente estão completamente abertas e desprotegidas no arquivo de rotas.
// Seu objetivo é importar os middlewares que você reorganizou na Atividade 1
// e aplicá-los corretamente nas rotas para garantir que SOMENTE administradores
// consigam listar e excluir usuários. (Não copie e cole este texto no código,
// apenas faça as modificações necessárias no arquivo de rotas).
// =========================================================================


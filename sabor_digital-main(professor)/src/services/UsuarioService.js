const UsuarioRepository = require('../repositories/UsuarioRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET || 'chave_super_secreta_sabor_digital_123';

class UsuarioService{
    async RegistrarUsuario({nome, email, senha, papel}){
        const usuarioExiste = await UsuarioRepository.findByEmail(email);
        if (usuarioExiste){
            return {sucesso: false, mensagem: 'Usuario já existe'};
        }

        // criptografa a senha
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt)

        const role = (papel === 'admin') ? 'admin': 'cliente';

        const novoUsuario = await UsuarioRepository.create({
            nome,
            email,
            senha: senhaHash,
            papel: role
        });

        return{sucesso: true, usuario: novoUsuario}
    }

    async Login(email, senha){
        const usuario = await UsuarioRepository.findByEmail(email)
        if(!usuario)
            return{sucesso: false, mensagem: "Usuário não encontrado"}

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValida){
            return{sucesso: false, mensagem: "Senha Inválida"}
        }

        const token = jwt.sign(
        {id: usuario.id, email: usuario.email,
        papel: usuario.papel},
        JWT_SECRET,
        {expiresIn: '8h'} // algorithm: 'ES256'
        );
        return {sucesso: true, token}
    }
}

module.exports = new UsuarioService();
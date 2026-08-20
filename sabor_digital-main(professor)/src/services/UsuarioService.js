const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const JWT_SECRET = process.env.JWT_SECRET || 'chave_super_secreta_sabor_digital_123';
// class UsuarioService{

// async Registrar usuário 

// criptografa a senha
const salt = await bcrypt.getSalt(10);
const senhaHash = await bcrypt.hash(senha, salt)

// define o papel (se não for admin, por padrão vai ser cliente)

const role = (papel === 'admin') ? 'admin': 'cliente';


const novoId = await UsuarioRepository.create({

})

return{
    sucesso : true,

}

// async login

const token = jwt.sign(
    {id: usuario.id, email: usuario.email,
    papel: usuario.papel},
    JWT_SECRET,
    {expiresIn: '8h'} // algorithm: 'ES256'
);

module.exports = new UsuarioService();
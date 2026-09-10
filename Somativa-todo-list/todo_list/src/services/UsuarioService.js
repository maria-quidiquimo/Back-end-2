const UsuarioRepository = require('../repositories/UsuarioRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class UsuarioService {
    
    
    async listar(adminId) {
        return await UsuarioRepository.listar(adminId);
    }
    async deletar(id) {
        const usuarioExistente = await UsuarioRepository.buscarPorId(id);
        if (!usuarioExistente) {
            throw new Error('Usuário não encontrado');
        }
        const deletado = await UsuarioRepository.deletar(id);
        if (!deletado) {
            throw new Error('Erro ao deletar usuário');
        }
        return { mensagem: 'Usuário deletado com sucesso' };
    }
}
module.exports = new UsuarioService();

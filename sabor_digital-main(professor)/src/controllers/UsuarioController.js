const UsuarioService = require('../services/UsuarioService');

class UsuarioController{

    async listar(req, res){
        try {
            const resultado = await UsuarioService.ListarUsuarios();
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    async buscarPorId(req, res){
        try {
            const resultado = await UsuarioService.buscarUsuarioPorId(req.params.id);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.mensagem || 500).json({
                sucesso: false, 
                mensagem: erro.mensagem || "Erro interno no servidor",
                erro: erro.stack || erro
            });
        }
    }

    async cadastrar(req, res){
        try {
            const dados = { ...req.body, file: req.file };
            const resultado = await UsuarioService.cadastrarUsuario(dados);
            res.status(201).json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno no servidor",
                erro: erro.stack || erro
            });
        }
    }

    async atualizar(req, res){
        try {
            const dados = { ...req.body, file: req.file };
            const resultado = await ProdutoService.atualizarProduto(req.params.id, dados);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })
        }
    }
    
    async deletar(req, res) {
        try {
            const resultado = await ProdutoService.deletarUsuario(req.params.id);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    async login(req,res){
        try{
            const {email, senha} = req.body;
            const resultado = await UsuarioService.Login(email, senha)
            res.json(resultado);
        }catch(erro){
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })
        }
    }
}

module.exports = new UsuarioController();
const TreinoService = require('../services/TreinoService');

class TreinoController {
    async listar(req, res) {
        try {
            const resultado = await TreinoService.listarTreinos();
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({ sucesso: false, mensagem: erro.mensagem || "Erro interno" });
        }
    }

    async buscarPorId(req, res) {
        try {
            const resultado = await TreinoService.buscarTreinoPorId(req.params.id);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({ sucesso: false, mensagem: erro.mensagem || "Erro interno" });
        }
    }

    // TODO: A função que recebe os dados do usuário para cadastrar foi apagada. Resgate nos trechos faltantes!

    async atualizar(req, res) {
        try {
            const resultado = await TreinoService.atualizarTreino(req.params.id, req.body);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({ sucesso: false, mensagem: erro.mensagem || "Erro interno" });
        }
    }

    async deletar(req, res) {
        try {
            const resultado = await TreinoService.deletarTreino(req.params.id);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({ sucesso: false, mensagem: erro.mensagem || "Erro interno" });
        }
    }
}

module.exports = new TreinoController();

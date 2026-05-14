const TreinoRepository = require('../repositories/TreinoRepository');

class TreinoService {
    async listarTreinos() {
        const treinos = await TreinoRepository.findAll();
        return { sucesso: true, dados: treinos, total: treinos.length };
    }

    async buscarTreinoPorId(id) {
        if (!id || isNaN(id)) throw { status: 400, mensagem: "ID inválido" };
        const treino = await TreinoRepository.findById(id);
        if (!treino) throw { status: 404, mensagem: "Treino não encontrado" };
        return { sucesso: true, dados: treino };
    }

    async cadastrarTreino(dados) {
        const { nome_aluno, instrutor, grupo_muscular, frequencia_semanal, ativo } = dados;
        if (!nome_aluno || !instrutor || !grupo_muscular || !frequencia_semanal) {
            throw { status: 400, mensagem: "Aluno, instrutor, grupo muscular e frequência são obrigatórios" };
        }
        if (typeof frequencia_semanal !== "number" || frequencia_semanal < 1 || frequencia_semanal > 7) {
            throw { status: 400, mensagem: "A frequência semanal deve ser entre 1 e 7 dias" };
        }

        const novoTreino = {
            nome_aluno: nome_aluno.trim(),
            instrutor: instrutor.trim(),
            grupo_muscular: grupo_muscular.trim(),
            frequencia_semanal,
            ativo: ativo ?? true
        };

        const id = await TreinoRepository.create(novoTreino);
        return { sucesso: true, mensagem: "Treino cadastrado com sucesso", id };
    }

    async atualizarTreino(id, dados) {
        if (!id || isNaN(id)) throw { status: 400, mensagem: "ID inválido" };
        
        const existe = await TreinoRepository.findById(id);
        if (!existe) throw { status: 404, mensagem: "Treino não encontrado" };

        const atualizado = {};
        const { nome_aluno, instrutor, grupo_muscular, frequencia_semanal, ativo } = dados;

        if (nome_aluno !== undefined) atualizado.nome_aluno = nome_aluno.trim();
        if (instrutor !== undefined) atualizado.instrutor = instrutor.trim();
        if (grupo_muscular !== undefined) atualizado.grupo_muscular = grupo_muscular.trim();
        if (frequencia_semanal !== undefined) {
            if (typeof frequencia_semanal !== "number" || frequencia_semanal < 1 || frequencia_semanal > 7) {
                 throw { status: 400, mensagem: "Frequência inválida" };
            }
            atualizado.frequencia_semanal = frequencia_semanal;
        }
        if (ativo !== undefined) atualizado.ativo = ativo;

        if (Object.keys(atualizado).length === 0) throw { status: 400, mensagem: "Nenhum dado válido" };

        await TreinoRepository.update(id, atualizado);
        return { sucesso: true, mensagem: "Treino atualizado com sucesso" };
    }

    // TODO: Como vamos validar a exclusão de um treino sem a função deletarTreino? Copie ela dos trechos faltantes!
}

module.exports = new TreinoService();

const pool = require('../config/database');

class TreinoRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM treino ORDER BY id DESC');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM treino WHERE id = ?', [id]);
        return rows[0];
    }

    async create(treinoData) {
        const { nome_aluno, instrutor, grupo_muscular, frequencia_semanal, ativo } = treinoData;
        const [result] = await pool.query(
            'INSERT INTO treino (nome_aluno, instrutor, grupo_muscular, frequencia_semanal, ativo) VALUES (?, ?, ?, ?, ?)',
            [nome_aluno, instrutor, grupo_muscular, frequencia_semanal, ativo]
        );
        return result.insertId;
    }

    // TODO: A query de atualizar os treinos no banco de dados sumiu! Busque no arquivo de trechos.

    async delete(id) {
        const [result] = await pool.query('DELETE FROM treino WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = new TreinoRepository();

const pool = require('../Config/database');

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

    async update(id, treinoData) {
        const fields = [];
        const values = [];
        for (const [key, value] of Object.entries(treinoData)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
        if (fields.length === 0) return null;

        values.push(id);
        const query = `UPDATE treino SET ${fields.join(', ')} WHERE id = ?`;
        const [result] = await pool.query(query, values);
        return result.affectedRows;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM treino WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = new TreinoRepository();

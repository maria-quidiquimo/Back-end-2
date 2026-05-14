const db = require('../config/database');

class PedidoRepository {
    async criarPedido(pedido) {
        const [result] = await db.query('INSERT INTO pedidos SET ?', pedido);
        return { id: result.insertId, ...pedido };
    }

    async listarPedidos() {
        const [rows] = await db.query('SELECT * FROM pedidos');
        return rows;
    }

    async buscarPedidoPorId(id) {
        const [rows] = await db.query('SELECT * FROM pedidos WHERE id = ?', [id]);
        return rows[0];
    }

    async atualizarPedido(id, dados) {
        await db.query('UPDATE pedidos SET ? WHERE id = ?', [dados, id]);
        return this.buscarPedidoPorId(id);
    }

    async deletarPedido(id) {
        await db.query('DELETE FROM pedidos WHERE id = ?', [id]);
    }
}

module.exports = new PedidoRepository();
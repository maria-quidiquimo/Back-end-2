//Acessa o banco de dados, então precisa ligar com o database q cuida dessa conexão
const pool = require('../config/database')

//trabalha mais com os métodos
class PedidoRepository{ //nome bem direto ___ + Repository
    async listarPedidos(){
        const listarPedidos = await pool.query('SELECT * FROM pedido ORDER BY criado_em DESC')
        return listarPedidos
    }

    async buscarPedidoPorId(id){
        const mostrarPedido = await pool.query('SELECT * FROM pedido WHERE id = ?', [id])
        return mostrarPedido[0]
    }

    async cadastrarPedido(dadosDoPedido){
        const resultadoCadastro = await pool.query('INSERT INTO pedidos SET ?', [dadosDoPedido])
        return resultadoCadastro.insertId
    }

    async atualizarPedido(id, dadosDoPedido){
        const camposPedido = []
        const dadosPedido = []

        for (const [key, value] of Object.entries(dadosDoPedido)){
            dadosDoPedido.push(`${key} = ?`)
            dadosDoPedido.push(value)
        }

        if (camposPedido.length === 0) return null
        dadosDoPedido.push(id)

        const query = `UPDATE pedido SET ${camposPedido.join(',')} WHERE id = ?`
        const resultado = await pool.query(query, dadosDoPedido)

        return resultado.affectedRows
    }

    async apagarPedido(id){
        await pool.query('DELETE FROM pedido WHERE id = ? ', [id])
        return true
    }

}

module.exports = new PedidoRepository()
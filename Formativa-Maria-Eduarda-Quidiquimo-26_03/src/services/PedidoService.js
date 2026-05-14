const PedidoRepository = require('../repositories/PedidoRepository');

class PedidoService {
    async criarPedido(dados) {
        return await PedidoRepository.criarPedido(dados);
    }

    async listarPedidos() {
        return await PedidoRepository.listarPedidos();
    }

    async buscarPedidoPorId(id) {
        const pedido = await PedidoRepository.buscarPedidoPorId(id);
        if (!pedido) throw new Error('Pedido não encontrado');
        return pedido;
    }

    async atualizarPedido(id, dados) {
        return await PedidoRepository.atualizarPedido(id, dados);
    }

    async deletarPedido(id) {
        return await PedidoRepository.deletarPedido(id);
    }
}

module.exports = new PedidoService();
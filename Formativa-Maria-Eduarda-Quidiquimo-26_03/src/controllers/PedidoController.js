const PedidoService = require('../services/PedidoService');

class PedidoController {
    async criarPedido(req, res) {
        try {
            const pedido = await PedidoService.criarPedido(req.body);
            res.status(201).json(pedido);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async listarPedidos(req, res) {
        try {
            const pedidos = await PedidoService.listarPedidos();
            res.status(200).json(pedidos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async buscarPedidoPorId(req, res) {
        try {
            const pedido = await PedidoService.buscarPedidoPorId(req.params.id);
            res.status(200).json(pedido);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async atualizarPedido(req, res) {
        try {
            const pedido = await PedidoService.atualizarPedido(req.params.id, req.body);
            res.status(200).json(pedido);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deletarPedido(req, res) {
        try {
            await PedidoService.deletarPedido(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new PedidoController();
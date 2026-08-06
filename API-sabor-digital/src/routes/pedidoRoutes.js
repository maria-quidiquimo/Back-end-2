const express = require ('express')
const router = express.Router()
const PedidoController = require('../controllers/pedidoController')

router.get('/', PedidoController.listarPedidos)
router.get('/:id', PedidoController.buscarPedidoPorId)
router.post('/', PedidoController.cadastrarPedido)
router.put('/:id', PedidoController.atualizarPedido)
router.delete('/:id', PedidoController.apagarPedido)


module.exports = router
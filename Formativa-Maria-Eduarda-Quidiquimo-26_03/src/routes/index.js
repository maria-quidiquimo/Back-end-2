const express = require('express')
const router = express.Router()

const produtoRoutes = require('./produtoRoutes')
const pedidoRoutes = require('./pedidoRoutes');

router.get('/', (req, res) => {
    res.json({
        mensagem: 'API sabor-digital',
        versao: '5.0.8'
    })
})

routes.use('/produtos', produtoRoutes)
routes.use('/pedidos', pedidoRoutes)
routes.use('cardapio', cardapioRoutes)

module.exports = router
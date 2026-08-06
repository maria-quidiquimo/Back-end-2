//faz as validações, confirmações (tipo se o o campo está preenchido se n dar erro)

const PedidoRepository = require('../repositories/pedidoRepository')

class PedidoService{
    async listarPedidos(){
        const pedidos = await PedidoRepository.listarPedidos() //acessa o método presente dentro do obj produtoRepository no arquivo ProdutoRepository
        return{
            sucesso:true,
            dados: pedidos,
            total: pedidos.length

        }
    }

    async buscarPedidoPorId(id){

        if(!id || isNaN(id)){
            throw{
                status: 400, 
                mensagem: "ID inválido"
            }
        }

        const pedido = await PedidoRepository.buscarPedidoPorId(id)

        if (!pedido){
            throw{
                status:404,
                mensagem:'Pedido não encontrado'
            }
        }

        return{
            sucesso: true,
            dados: pedido
        }


        const pedidos = await PedidoRepository.listarPedidos() //acessa o método presente dentro do obj produtoRepository no arquivo ProdutoRepository
        return{
            sucesso:true,
            dados: pedidos,
            total: pedidos.length

        }
    }

    async cadastrarPedido(dadosDoPedido){
        const {cliente, status, total} = dadosDoPedido
a
        if (!cliente || !status || total === undefined){
            throw{
                status: 400,
                mensagem: 'Nome, status e preço total são campos obrigatórios!'
            }
        }
        
        if (typeof total !== 'number' || total <=0){
            throw{
                status: 400,
                mensagem: "Preço deve ser um número positivo"
            }
        }

        const novoPedido = {
            cliente: cliente.trim(),
            status: status.trim(),
            total: total,
            
        }

        const resultado = await PedidoRepository.cadastrarPedido(novoPedido)

        return{
            sucesso:true,
            mensagem: "Pedido cadastrado com sucesso",
            resultado
        }
    }

    async atualizarPedido(id, dadosDoPedido){

        if (!id || isNaN(id)){
            throw{
                status: 400,
                mensagem:"ID inválido"
            }
        }

        const pedidoId = await pedidoRepository.buscarPedidoPorId(id)
        if(pedidoId.length == 0){
            throw{
                status: 404,
                mensagem: "Pedido não encontrado"
            }
        }

        const pedidoAtualizado = {}
        const {cliente, status, total} = dadosDoPedido

        if (cliente !== undefined && cliente.trim() !== ' ') pedidoAtualizado.cliente = cliente.trim()
        if (status !== undefined) pedidoAtualizado.status = status.trim()
        if (total !== undefined){
            if (typeof total !== 'number' || total <= 0){
                throw{
                    status: 400,
                    mensagem: "Preço deve ser um número positivo"
                }
            }
        } 
        pedidoAtualizado.total = total

        if (Object.keys(pedidoAtualizado).length === 0){
            throw{
                status: 400,
                mensagem:'Nenhum dado foi enviado para a atualização'
            }
        }

        await PedidoRepository.atualizarPedido(id, pedidoAtualizado)
        
        return{
            sucesso:true,
            mensagem: 'Pedido atualizado'

        }

    }

    async apagarPedido(id){
        if (!id || isNaN(id)){
            throw{
                status: 400,
                mensagem: "ID inválido"
            }
        }

        const idPedido = await PedidoRepository.buscarPedidoPorId(id)
        if (!idPedido){
            throw{
                status: 404,
                mensagem: "Pedido não encontrado"
            }
        }

        await PedidoRepository.apagarPedido(id)
        return{
            sucesso:true,
            mensagem:'Pedido apagado!'
        }
     }
}

module.exports = new PedidoService()
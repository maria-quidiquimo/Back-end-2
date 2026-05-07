const ProdutoRepository = require('../repositories/ProdutoRepositorie')

class ProdutoService{
    async listarProdutos(){
        const produtos = await ProdutoRepository.listarProdutos()

        return {
            sucesso: true,
            dados: produtos,
            total: produtos.length 
        }
    }   

    async buscarProdutoPorId(id){

        if(!id || isNaN(id)){
            throw{
                status: 400,
                mensagem: "ID inválido"
            }
        }

        const produto = await ProdutoRepository.buscarProdutoPorId(id)

        if (!produto){
            throw{
                status:404,
                mensagem:'Produto não encontrado'
            }
        }

        return{
            sucesso: true,
            dados: produto
        }

    async cadastrarProduto(dados){
        const {nome, descricao, preco, categoria, disponivel} = dados

        if(!nome || !descricao || preco === undefined){
            throw{
                status: 400,
                mensagem: 'Nome, descrição e preço são obrigatórios.'
            }
        }

        if(typeof preco !== 'number' || preco <= 0){
            throw{
                status: 400,
                mensagem: 'Preço deve ser um número positivo'
            }
        }

        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco,
            categoria: categoria || null,
            disponivel: disponivel || true
        }

    }
}
}

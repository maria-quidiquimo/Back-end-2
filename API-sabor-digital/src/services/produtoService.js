//faz as validações, confirmações (tipo se o o campo está preenchido se n dar erro)
//cria o objeto com todos os dados corretos

const produtoRepository = require('../repositories/produtoRepository')

class ProdutoService{
    async listarProdutos(){
        const produtos = await produtoRepository.listarProdutos() //acessa o método presente dentro do obj produtoRepository no arquivo ProdutoRepository
        return{
            sucesso:true,
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

        const produto = await produtoRepository.buscarProdutoPorId(id)

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


        const produtos = await produtoRepository.listarProdutos() //acessa o método presente dentro do obj produtoRepository no arquivo ProdutoRepository
        return{
            sucesso:true,
            dados: produtos,
            total: produtos.length

        }
    }

    //CADASTRO DO PRODUTO!!!!
    async cadastrarProduto(dadosDoProduto){
        let { nome, descricao, preco, categoria, disponivel, imagem } = dadosDoProduto;

        // Converte o preço para número
        preco = parseFloat(preco);

        if (!nome || !descricao || preco === undefined || isNaN(preco)){
            throw {
                status: 400,
                mensagem: 'Nome, descrição e preço são campos obrigatórios!'
            };
        }

        if (typeof preco !== 'number' || preco <= 0){
            throw {
                status: 400,
                mensagem: "Preço deve ser um número positivo"
            };
        }

        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco,
            categoria: categoria || null,
            disponivel: disponivel ?? true,
            imagem
        };

        const resultado = await produtoRepository.cadastrarProduto(novoProduto);

        return {
            sucesso: true,
            mensagem: "Produto cadastrado com sucesso",
            resultado
        };
    }


    async atualizarProduto(id, dadosDoProduto){

        if (!id || isNaN(id)){
            throw{
                status: 400,
                mensagem:"ID inválido"
            }
        }

        const produtoId = await produtoRepository.buscarProdutoPorId(id)
        if(!produtoId){
            throw{
                status: 404,
                mensagem: "Produto não encontrado"
            }
        }

        const produtoAtualizado = {}
        const {nome, descricao, preco, categoria, disponivel} = dadosDoProduto

        if (nome !== undefined && nome.trim() !== '') produtoAtualizado.nome = nome.trim()
        if (descricao !== undefined) produtoAtualizado.descricao = descricao.trim()
        if (preco !== undefined){
            if (typeof preco !== 'number' || preco <= 0){
                throw{
                    status: 400,
                    mensagem: "Preço deve ser um número positivo"
                }
            }
        } 
        produtoAtualizado.preco = preco
        if (dadosDoProduto.imagem !== undefined) {
            produtoAtualizado.imagem = dadosDoProduto.imagem;
}


        if (categoria !== undefined) produtoAtualizado.categoria = categoria
        if (disponivel !== undefined) produtoAtualizado.disponivel = disponivel

        if (Object.keys(produtoAtualizado).length === 0){
            throw{
                status: 400,
                mensagem:'Nenhum dado foi enviado para a atualização'
            }
        }

        await produtoRepository.atualizarProduto(id, produtoAtualizado)
        
        return{
            sucesso:true,
            mensagem: 'Produto atualizado'

        }

    }

    async apagarProduto(id){
        if (!id || isNaN(id)){
            throw{
                status: 400,
                mensagem: "ID inválido"
            }
        }

        const idProduto = await produtoRepository.buscarProdutoPorId(id)
        if (!idProduto){
            throw{
                status: 404,
                mensagem: "Produto não encontrado"
            }
        }

        await produtoRepository.apagarProduto(id)
        return{
            sucesso:true,
            mensagem:'Produto apagado!'
        }
     }
}

module.exports = new ProdutoService()
//interage com a view, definindo as respostas q serão enviadas para o usuário (prepara o JSON para enviar)
//só chama a service, salva em uma variável de resposta e manda

const ProdutoService = require('../services/produtoService')

class ProdutoController{
    async listarProduto(req,res){
        try {
            const resultado = await ProdutoService.listarProdutos()
            res.json(resultado)
            
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })
        }
    }


    async buscarProdutoPorId(req,res){
        try {
            const resultado = await ProdutoService.buscarProdutoPorId(req.params.id)
            res.json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })     
        }
    }


    async cadastrarProduto(req,res){
        try {
            //TESTE DE ENVIO NO CONSOLE (VERIFICAÇÃO)
            console.log('Body:', req.body);
            console.log('File:', req.file);

            const dadosDoProduto = {
                ...req.body,        //COPIA OS CAMPOS DA REQUISIÇÃO (NOME E TALS)
                imagem: req.file ? req.file.path : null //ADICIONA O CAMINHO DA IMAGEM AO 'BODY'
                //SE O USUÁRIO ENVIAR IMAGEM, ELE PEGA O CAMINHO, SE NÃO, DEIXA NULL
            };

            const resultado = await ProdutoService.cadastrarProduto(dadosDoProduto);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }



    async atualizarProduto(req,res){
        try {
            const resultado = await ProdutoService.atualizarProduto(req.params.id, req.body)
            res.json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })     
        }
    }


    async apagarProduto(req,res){
        try {
            const resultado = await ProdutoService.apagarProduto(req.params.id)
            res.json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })     
        }
    }
}

module.exports = new ProdutoController()
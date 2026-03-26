const express = require('express')
const pool = require ('./config/database')

const app = express()
app.use(express.json())

const queryAsync =(sql, values = []) =>{
    return new Promise((resolve, reject) =>{
        pool.query(sql, values, (err, results) =>{
            if(err) reject(err)
            else resolve(results)
        })
    })
}

app.get('/', (req,res) =>{
    res.send("API SABOR DIGITAL")
})

app.get('/produtos', async (req,res) =>{
    try {
        const produtos = await queryAsync ('SELECT * FROM produto')
        res.json({
            sucesso: true,
            dados: produtos,
            total: produtos.length
        })
    } catch (erro) {
        console.error('Erro ao listar produto', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar produtos',
            erro: erro
        })
    }
})

app.get('/produtos/:id', (req, res) =>{
    const {id} = req.params
    pool.query('SELECT * FROM produto WHERE id = ?', [id], (err, results) =>{
        res.json(results)
    })
})

app.get('/produtos/:id', async (req, res) =>{
    const {id} = req.params
    try {
        if(!id || isNaN (id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID Produto Inválido'
            })
        }
        if(produto.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Produto não encontrado'
            })
        }
        const produto = await queryAsync ('SELECT * FROM produto WHERE id = ?', [id])
        res.json({
            sucesso: true,
            id: id,
            dados: produto
        })
    } catch (erro) {
        console.error ('Erro ao procurar Produto', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao procurar Produto',
            erro: erro.message
        })
    }
})

app.post('/produtos', async (req, res) =>{
    try {
        const {nome, descricao, preco, disponivel} = req.body
        if(!nome || !descricao || !preco || !disponivel){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nome, descrição, preço e disponibilidade são obrogatórios'
            })
        }

        if(typeof preco != 'number' || preco <=0){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Preço deve ser um número positivo'
            })
        }
        if(typeof disponivel != 'boolean'){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Você deve colocar se está disponível ou não'
            })
        }

        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco,
            disponivel
        }
        const resultado = await queryAsync ('INSERT INTO produto SET ?', [novoProduto])

        res.status(201).json({
            sucesso: true,
            mensagem: 'Produto cadastrado com sucesso',
            id: resultado.insertId
        })

    } catch (error) {
        console.error('Erro ao salvar o Produto.', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao salvar o Produto.',
            erro: erro.message
        })
    }
})

app.put('/produtos/:id', async (req,res) =>{
    try {
        const {id} = req.params
        const {nome, descricao, preco, disponivel} = req.body

        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID produto inválido'
            })
        }

        const produtoExiste = await queryAsync('SELECT * FROM produto WHERE id = ?', [id])
        if(produtoExiste.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: ' Produto não encontrado'
            })
        }

        const produtoAtualizado = {}

        if (nome !== undefined) produtoAtualizado.nome = nome.trim()
        if(descricao !== undefined) produtoAtualizado.descricao = descricao.trim()
        if(preco !== undefined){
            if(typeof preco !== 'number' || preco <= 0){
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Preço deve ser um número positivo'
                })
            }
            produtoAtualizado.preco = preco
        }
        if(disponivel !== undefined){
            if(typeof disponivel !== 'boolean'){
                return res.status(400).json({
                    sucesso: false,
                    mensagem:'Você precisa definir corretamente a disponibilidade!'
                })
            }
            produtoAtualizado.disponivel = disponivel
        }

        if(Object.keys (produtoAtualizado).length === 0){
            return res.status(400).json({
                sucesso: false,
                mensagem:'Tem nenhum campo para atualizar.'
            })
        }

        await queryAsync ('UPDATE produto SET ? WHERE id = ?', [produtoAtualizado, id])
        res.json({
            sucesso: true,
            mensagem: 'Produto atualizado com sucesso.'
        })

    } catch (erro) {
        console.error('Erro ao atualizar o produto', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar o produto',
            erro: erro.message
        })
    }
})

app.delete('/produtos/:id', async (req,res) =>{
    try {
        const {id} = req.params
        const {nome, descricao, preco, disponivel} = req.body

        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID produto inválido'
            })
        }

        const produtoExiste = await queryAsync('SELECT * FROM produto WHERE id = ?', [id])
        if(produtoExiste.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: ' Produto não encontrado'
            })
        }

        await queryAsync('DELETE FROM produto WHERE id = ?', [id])

        res.status(200).json({
            sucesso: true,
            mensagem: 'Produto apagado com sucesso'
        })

    }catch{
        console.error('Erro ao atualizar produto', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar produto',
            erro: erro.message
        })
    }
})

module.exports = app
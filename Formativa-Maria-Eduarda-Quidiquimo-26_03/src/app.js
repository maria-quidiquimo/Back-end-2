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



module.exports = app
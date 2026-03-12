// // vai ter conexão com o banco de dados

// const express = require('express')
// const pool = require('./config/database') // puxando as informações da database.

// const app = express()

// app.use(express.json()) //tudo nos arquivos está trabalhando com arquivos json.

// app.get('/', (req,res) =>{
//     res.send("API Cinema")
// })

// app.get('/filmes', (req,res) =>{
//     pool.query('SELECT * FROM filmes', (err, results) => {
//         res.json(results)
//     })
// })

// app.get('/filmes/:id', (req,res) => {
//     const {id} = req.params

//     pool.query('SELECT * FROM filme WHERE id = ?', [id],(err, results) =>{
//         res.json(results)
//     })
// })


// codigo professor

const express = require('express')
const pool = require('./config/database')

const app = express()
app.use(express.json())

const queryAsync = (sql, values = []) =>{
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, results) =>{
            if(err) reject(err)
            else resolve(results)
        })
    })
} //alinhando código js com banco


app.get('/', (req,res) => {
    res.send("API CINEMA")
})

// app.get('/filmes', (req,res) => {
//     pool.query('SELECT * FROM filme', (err, results) =>{
//         res.json(results)
//     })
// })

app.get('/filmes', async (req, res) => {
    try{
        const filmes = await queryAsync('Select * FROM filme')
        res.json({
            sucesso: true,
            dados: filmes,
            total: filmes.length
        })
    }
    catch(erro){
        console.error ('Erro ao listar filmes', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar filmes',
            erro: erro.message
        })
    }
})

app.get('/filmes/:id', (req,res) => {
    const {id} = req.params

    pool.query('SELECT * FROM filme WHERE id = ?', [id],(err, results) =>{
        res.json(results)
    })
})


//NOVO
app.get ('/filmes/:id', async (req,res) =>{ //coloca o async pra informar q é assíncrona, e q vai ter q esperar uma resposta alguma hr
//try é a estrututra de q vai dar certo (teste de validação) e catch coloca a mensagem de erro
    const {id} = req.params //recupera o id - PRECISA FAZER ISSO ANTES DE CODAR
    try {

        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso:false,
                mensagem: 'ID de filme inválido'
            })
        }
 
       if(filme.length === 0 ){  //esse if direciona para o catch
        return res.status(404).json({
            sucesso: false,
            mensagem: 'Filme não encontrado'
        })
       }
        const filme = await queryAsync('SELECT * FROM filme WHERE id = ?', [id])
        res.json({
            sucesso: true,
            id: id,
            dados:filme,
        })
    }
       
    catch (erro) { //trata erro de servidor, e não de busca, o erro de busca foi tratado lá na validação
        console.error ('Erro ao procuar filme', erro)
        res.status(500).json({
            sucesso:false,
            mensagem: 'Erro ao procurar filme',
            erro: erro.message
        })
    }

})


module.exports = app
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

app.get('/filmes', (req,res) => {
    pool.query('SELECT * FROM filme', (err, results) =>{
        res.json(results)
    })
})

app.get('/filmes/:id', (req,res) => {
    const {id} = req.params

    pool.query('SELECT * FROM filme WHERE id = ?', [id],(err, results) =>{
        res.json(results)
    })
})

module.exports = app
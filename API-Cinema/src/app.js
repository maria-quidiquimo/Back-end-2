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


// FILMES - GET, POST, PUT E DELETE

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


app.post ('/filmes', async (req,res) =>{// '/filmes' é a rota / o try catch serve para não travar o sistema do cliente
    try {// acessar o banco de dados e ver se o conteudo é valido
        const {titulo, genero, duracao, classificacao, data_lancamento} = req.body

        if(!titulo || !genero || !duracao){// ! significa negação
            return res.status(400).json({//status 400 é quando ele tras um erro que o servidor não consegue concluir algo que foi solicitado 
                sucesso: false,
                mensagem: 'Título, gênero e duração são obrigatórios.'
            })    
        }

        if(typeof duracao != 'number' || duracao <= 0){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Duração deve ser um número positivo'
            })
        }

        const novoFilme = {
            titulo: titulo.trim(),//trim() tira todos os espaços
            genero: genero.trim(),
            duracao,
            classificacao: classificacao || null,// quando não da um comando para a classificacao coloca o null
            data_lancamento: data_lancamento || null
        }

        const resultado = await queryAsync('INSERT INTO filme SET ?', [novoFilme])// usamos await para a tentativa de salvar no banco / SET serve para salvar todas as infromações do banco de dados (é mais simples)

        res.status(201).json({// status 201 serve para algo novo que deu certo
            sucesso: true,
            mensagem: 'Filme cadastrado com sucesso.',
            id: resultado.insertId
        })

    } catch (erro) { // vai tratar o erro de conexão com o servidor e banco de dados
        console.error('Erro ao salvar o filme.', erro)
        res.status(500).json({// erro 500 é o erro do servidor, o cliente não vai conseguir fazer nada 
            sucesso: false,
            mensagem: 'Erro ao salvar o filme.',
            erro: erro.message
        })

    }
})

app.put('/filmes/:id', async (req,res) =>{
    try {
        const {id} = req.params
        const {titulo, genero, duracao, classificacao, data_lancamento} = req.body

        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID filme inválido'
            })
        }

        const filmeExiste = await queryAsync('SELECT * FROM filme WHERE id = ?', [id])
        if(filmeExiste.length === 0){
            return res.status(404).json({// 404 é quando não localiza a informação
                sucesso: false,
                mensagem: 'Filme não encontrado.'
            })
        }

        const filmeAtualizado = {}
        
        if(titulo !== undefined) filmeAtualizado.titulo = titulo.trim() // if mais simples não precisa ficar abrindo chaves ou fechando
        if(genero !== undefined) filmeAtualizado.genero = genero.trim()
        if(duracao !== undefined){
            if(typeof duracao !== 'number' || duracao <= 0){
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Duração deve ser um número positivo.'
                }) // return da duracao
            } // if interno typeof duracao
            filmeAtualizado.duracao = duracao
        } // duracao undefined
        if(classificacao !== undefined) filmeAtualizado.classificacao = classificacao
        if(data_lancamento !== undefined) filmeAtualizado.data_lancamento = data_lancamento

        if(Object.keys(filmeAtualizado).length === 0){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Tem nenhum campo para atualizar.'
            })
        }

        await queryAsync('UPDATE filme SET ? WHERE id = ?', [filmeAtualizado, id])
        res.json({
            sucesso: true,
            mensagem: 'Filme atualizado com sucesso.'
        })

    } catch (erro) { // todos os códigos catch vai ter a estrutura do código igual, só muda a mensagem
        console.error('Erro ao atualizar o filme.', erro)
        res.status(500).json({// erro 500 é o erro do servidor, o cliente não vai conseguir fazer nada 
            sucesso: false,
            mensagem: 'Erro ao atualizar o filme.',
            erro: erro.message
        })
    }
})

app.delete('/filmes/:id', async (req,res) =>{
    try {
        const {id} = req.params

        // código copiado do put (o inicio do put)
        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID filme inválido'
            })
        }

        const filmeExiste = await queryAsync('SELECT * FROM filme WHERE id = ?', [id])

        if(filmeExiste.length === 0){
            return res.status(404).json({// 404 é quando não localiza a informação
                sucesso: false,
                mensagem: 'Filme não encontrado.'
            })
        }

        await queryAsync('DELETE FROM filme WHERE id = ?', [id])

        res.status(200).json({
            sucesso: true,
            mensagem: 'Filme apagado com sucesso.'
        })

    } catch (erro) {// o catch não é diferente do put, somente a mensagem que é diferente
        console.error('Erro ao atualizar o filme.', erro)
        res.status(500).json({// erro 500 é o erro do servidor, o cliente não vai conseguir fazer nada 
            sucesso: false,
            mensagem: 'Erro ao atualizar o filme.',
            erro: erro.message
        })
    }
})

// SALAS - GET, POST, PUT E DELETE

app.get('/salas', async (req, res) => {
    try{
        const salas = await queryAsync('Select * FROM sala ')
        res.json({
            sucesso: true,
            dados: salas,
            total: salas.length
        })
    }
    catch(erro){
        console.error ('Erro ao listar salas', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar salas',
            erro: erro.message
        })
    }
})


app.get ('/salas/:id', async (req,res) =>{
    const {id} = req.params 
    try {

        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso:false,
                mensagem: 'ID da sala inválido'
            })
        }
        const sala = await queryAsync('SELECT * FROM sala WHERE id = ?', [id])
 
       if(sala.length === 0 ){
        return res.status(404).json({
            sucesso: false,
            mensagem: 'Sala não encontrada'
        })
       }
        
        res.json({
            sucesso: true,
            id: id,
            dados: sala,
        })
    }
       
    catch (erro) { 
        console.error ('Erro ao procuar a sala', erro)
        res.status(500).json({
            sucesso:false,
            mensagem: 'Erro ao procurar a sala',
            erro: erro.message
        })
    }

})


app.post ('/salas', async (req,res) =>{
    try {
        const {nome, capacidade} = req.body

        if(!nome || !capacidade){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nome e capacidade são obrigatórios.'
            })    
        }

        if(typeof capacidade != 'number' || capacidade <= 0){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Capacidade deve ser um número positivo'
            })
        }

        const novaSala = {
            nome: nome.trim(),
            capacidade
        }

        const resultado = await queryAsync('INSERT INTO sala SET ?', [novaSala])

        res.status(201).json({
            sucesso: true,
            mensagem: 'Sala cadastrada com sucesso.',
            id: resultado.insertId
        })

    } catch (erro) { 
        console.error('Erro ao salvar a sala.', erro)
        res.status(500).json({ 
            sucesso: false,
            mensagem: 'Erro ao salvar a sala.',
            erro: erro.message
        })

    }
})


app.put('/salas/:id', async (req,res) =>{
    try {
        const {id} = req.params
        const {nome, capacidade} = req.body

        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID da sala inválido'
            })
        }

        const salaExiste = await queryAsync('SELECT * FROM sala WHERE id = ?', [id])
        if(salaExiste.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Sala não encontrada.'
            })
        }

        const salaAtualizada = {}
        
        if(nome !== undefined) salaAtualizada.nome = nome.trim()
        if(capacidade !== undefined){
            if(typeof capacidade !== 'number' || capacidade <= 0){
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Capacidade deve ser um número positivo.'
                })
            }
            salaAtualizada.capacidade = capacidade
        }

        if(Object.keys(salaAtualizada).length === 0){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Tem nenhum campo para atualizar.'
            })
        }

        await queryAsync('UPDATE sala SET ? WHERE id = ?', [salaAtualizada, id])
        res.json({
            sucesso: true,
            mensagem: 'Sala atualizada com sucesso.'
        })

    } catch (erro) {
        console.error('Erro ao atualizar a Sala.', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar a Sala.',
            erro: erro.message
        })
    }
})


app.delete('/salas/:id', async (req,res) =>{
    try {
        const {id} = req.params

        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID sala inválido'
            })
        }

        const salaExiste = await queryAsync('SELECT * FROM sala WHERE id = ?', [id])

        if(salaExiste.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Sala não encontrado.'
            })
        }

        await queryAsync('DELETE FROM sala WHERE id = ?', [id])

        res.status(200).json({
            sucesso: true,
            mensagem: 'Sala apagada com sucesso.'
        })

    } catch (erro) {
        console.error('Erro ao atualizar a sala.', erro)
        res.status(500).json({ 
            sucesso: false,
            mensagem: 'Erro ao atualizar a sala.',
            erro: erro.message
        })
    }
})


// SESSÃO - GET, POST, PUT E DELETE



module.exports = app
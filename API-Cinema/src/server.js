// importação das bibliotecas ou dos módulos aqui dentro.

const pool = require('./config/database')

//criando conexão
pool.getConnection((err, connection) => {
    if(err){
        console.error('Erro ao conectar ao banco: ', err) // trás informação sobre o erro, ele já é mais voltado para erros no geral.
        process.exit(1)
    }
    console.log('Conectado ao MySQL')
    connection.release()
})
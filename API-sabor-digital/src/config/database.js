// const mysql = require('mysql2') //importação da biblioteca mysql2
// require('dotenv').config() //pega as variáveis criadas no arquivo .env (definições do banco de dados) Sem ele o pool não conseguiria acessar os valores que foram definidos

// //O pool é uma funcionalidade da biblioteca mysql2 que cria e gerencia a conexão, que pode ser utilizada várias vezes psoteriormente ao ser exportada
// //Na const pool, importamos os dados q foram acessados pelo 'require('dotenv').config()

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,   
//     user: process.env.DB_USER,   
//     password: process.env.DB_PASSWORD,    
//     database: process.env.DB_NAME,    
//     port: process.env.DB_PORT,   

//     waitForConnections: true, //quando não houver conexão, ele vai efileirar as solicitações
//     connectionLimit: 10, //limite de quantidade de conexões
//     queueLimit: 0 //limita a fila de espera pela conexão
// })



const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,   
  user: process.env.DB_USER,   
  password: process.env.DB_PASSWORD,    
  database: process.env.DB_NAME,    
  port: process.env.DB_PORT,   

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;

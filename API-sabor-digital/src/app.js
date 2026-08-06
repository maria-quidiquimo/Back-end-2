const path = require('path') // <-- Adicione esta linha
const express = require('express')
const app = express()
const routes = require('./routes')

app.use(express.json())
app.use('/', routes)
// Toda vez que alguém acessar a URL /public, o express vai buscar arquivos na pasta física 'public'
app.use('/public', express.static(path.join(__dirname, '..', 'public')));module.exports = app
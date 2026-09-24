const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');

const swaggerUi = require('swagger-ui-express')
const swaggerFiles = require('swagger_output.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFiles))

app.use(cors());
app.use(express.json());

// Registro de rotas
app.use(routes);

module.exports = app;

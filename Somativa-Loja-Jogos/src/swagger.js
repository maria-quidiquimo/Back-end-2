const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API - Loja de Jogos',
        description: 'Documentação automática de API de Lojas de Jogos',
        version: '1.0.0'
    },
    host: 'localhost:3001',
    schemes: ['http'],
}

const outputFiles = './swagger_output.json';

const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFiles, endpointsFiles, doc).then(() => {
    console.log('Documentação gerada com sucesso!')
});
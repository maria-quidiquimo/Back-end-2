const app = require('./app');
const pool = require('./config/database');

const PORT = 3000;

async function start() {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado ao MySQL com sucesso! 🎉');
        connection.release();

        await inicializarEsportes();
    } catch (err) {
        console.error('Erro ao conectar no banco:', err);
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

start();
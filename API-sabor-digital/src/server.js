const app = require('./app');
const pool = require('./config/database');

const PORT = 3000;

// Testa a conexão com o banco (opcional)
(async () => {
  try {
    await pool.query('SELECT 1'); // teste simples
    console.log("✅ Conexão com o banco estabelecida!");
  } catch (err) {
    console.error("❌ Erro ao conectar no banco:", err);
  }
})();

// Sobe o servidor
app.listen(PORT, () => {
  console.log(`🌟 Servidor rodando na porta ${PORT}! 🌟`);
});
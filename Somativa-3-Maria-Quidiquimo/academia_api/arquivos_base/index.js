const express = require('express');
const router = express.Router();
const treinoRoutes = require('./treinoRoutes');

router.use('/api/treinos', treinoRoutes);

module.exports = router;

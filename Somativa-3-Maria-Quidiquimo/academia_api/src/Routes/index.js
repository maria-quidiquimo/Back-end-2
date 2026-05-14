const express = require('express');
const router = express.Router();
const treinoRoutes = require('./TreinoRoutes');

router.use('/api/treinos', treinoRoutes);

module.exports = router;

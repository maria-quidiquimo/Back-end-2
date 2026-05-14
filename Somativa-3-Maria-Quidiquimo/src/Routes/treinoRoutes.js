const express = require('express');
const router = express.Router();
const TreinoController = require('../controllers/TreinoController');

router.get('/', TreinoController.listar);
router.get('/:id', TreinoController.buscarPorId);
router.post('/', TreinoController.cadastrar);
router.put('/:id', TreinoController.atualizar);
router.delete('/:id', TreinoController.deletar);

module.exports = router;

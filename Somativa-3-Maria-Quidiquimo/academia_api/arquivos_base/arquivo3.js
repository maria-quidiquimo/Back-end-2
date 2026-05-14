const express = require('express');
const router = express.Router();
const TreinoController = require('../controllers/TreinoController');

router.get('/', TreinoController.listar);
// TODO: O aluno sumiu! A rota que busca um treino por ID foi deletada.
router.post('/', TreinoController.cadastrar);
router.put('/:id', TreinoController.atualizar);
router.delete('/:id', TreinoController.deletar);

module.exports = router;

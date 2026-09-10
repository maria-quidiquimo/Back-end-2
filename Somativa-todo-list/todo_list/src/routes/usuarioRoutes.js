const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');


router.post('/registrar', UsuarioController.registrar);
router.post('/login', UsuarioController.login);
router.get('/', UsuarioController.listar);
router.delete('/:id', UsuarioController.deletar);
module.exports = router;

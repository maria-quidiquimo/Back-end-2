const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/UsuarioController')
const upload = require('../config/multer')
const{verificaToken, verificaAdmin} = require('../middlewares/authMiddlewares')


router.get('/', usuarioController.listar)
router.get('/:id', usuarioController.buscarPorId)
router.post('/', verificarToken, verificarAdmin, upload.single('imagem'), usuarioController.cadastrar)
router.put('/:id', verificaToken, verificaAdmin, usuarioController.atualizar)
router.delete('/:id', verificarToken,verificarAdmin, usuarioController.deletar)

module.exports = router;
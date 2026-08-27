const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/UsuarioController')
const upload = require('../config/multer')


router.get('/', usuarioController.listar)
router.get('/:id', usuarioController.buscarPorId)
// router.post('/', verificarToken, verificarAdmin, upload.single('imagem'), usuarioController.cadastrar)
// router.put
// router.delete('/:id', verificarToken,verificarAdmin, usuarioController.deletar)

module.exports = router;
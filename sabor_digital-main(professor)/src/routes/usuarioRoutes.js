const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/UsuarioController')
const upload = require('../config/multer')
const{verificarToken, verificarAdmin} = require('../middlewares/authMiddlewares')


router.get('/', usuarioController.listar)
router.get('/:id', usuarioController.buscarPorId)
router.post('/', verificarToken, verificarAdmin, upload.single('imagem'), usuarioController.cadastrar)
router.put('/:id', verificarToken, verificarAdmin, usuarioController.atualizar)
router.delete('/:id', verificarToken,verificarAdmin, usuarioController.deletar)

router.post('/login', usuarioController.login);

module.exports = router;
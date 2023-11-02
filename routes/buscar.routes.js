const { Router } = require('express')
const { buscarGet } = require('../controllers/buscar.controller')
const { validarJWT, validarCampos } = require('../middlewares/exportsMiddleware')

const router = Router()
router.get('/:coleccion/:terminoBuscar', [
    validarJWT,
    validarCampos], buscarGet)

module.exports = router
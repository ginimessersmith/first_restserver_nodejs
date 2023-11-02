const { Router } = require('express')
const { validarCampos, validarArchivo } = require('../middlewares/exportsMiddleware')
const { upLoadPost, upLoadPutCloudinary, upLoadGet } = require('../controllers/upload.controller')
const { check } = require('express-validator')
const { coleccionesPermitidas, existeId } = require('../helpers/db-validators')

const route = Router()

route.get('/:coleccion/:id', [
    check('id', 'el id debe ser un mongoId').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['users', 'producto','categoria'])),
    validarCampos
], upLoadGet)

route.post('/', [
    validarArchivo,
    validarCampos], upLoadPost)

route.put('/:coleccion/:id', [
    check('id', 'el id debe ser un mongoId').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['users', 'producto'])),
    validarArchivo,
    validarCampos
], upLoadPutCloudinary)

module.exports = route
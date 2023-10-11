const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/exportsMiddleware')
const { productosGet, productoPost, productoPut, productoDelete, productoGetId } = require('../controllers/productos.controller')
const { validarJWT } = require('../middlewares/validarJWT.middleware')
const { existeCategoriaId, existeProductoId } = require('../helpers/db-validators')

const router = Router()

router.get('/', [
    validarJWT,
    validarCampos
], productosGet)

router.get('/:id', [
    validarJWT,
    check('id', 'el id tiene que ser de mongoid').isMongoId(),
    validarCampos
], productoGetId)

router.post('/', [
    validarJWT,
    check('categoria', 'el id categoria no es de mongoid').isMongoId(),
    check('categoria', 'la categoria no existe').custom(existeCategoriaId),
    validarCampos],
    productoPost)

router.put('/:id', [
    validarJWT,
    check('id','el id no es de mongoid').isMongoId(),
    check('id','este producto no existe').custom(existeProductoId),
    validarCampos],
    productoPut)

router.delete('/:id', [
    validarJWT,
    check('id','el id no es de mongoid').isMongoId(),
    check('id','este producto no existe').custom(existeProductoId),
    validarCampos]
    , productoDelete)


module.exports = router 
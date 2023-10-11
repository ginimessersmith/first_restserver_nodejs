const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validarCampos.middlewares')
const { categoriaGet, categoriaGetId, categoriaPost, categoriaPut, categoriaDelete } = require('../controllers/categoria.controller')
const { validarJWT } = require('../middlewares/validarJWT.middleware')
const { existeCategoriaId } = require('../helpers/db-validators')
const { esAdminRole } = require('../middlewares/validarRoles.middlewares')

const router = Router()

//? retornar todo sin validaciones
router.get('/', [
    validarCampos
], categoriaGet)

//? retornar mediante id sin validaciones
router.get('/:id', [
    check('id', 'no es un MongoID').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos,
], categoriaGetId)

//? crear categoria con validaciones jwt y de roles
router.post('/', [
    validarJWT,
    check('nombre', 'el  nombre es obligatorio').notEmpty(),
    validarCampos
], categoriaPost)

//? actualizar con validaciones jwt y roles
router.put('/:id', [
    validarJWT,
    check('id', 'no es un MongoID').isMongoId(),
    check('id').custom(existeCategoriaId),
    check('nombre', 'el nombre es obligatorio').notEmpty(),
    validarCampos
], categoriaPut)

//? eliminar con validaciones jwt y roles
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'no es un MongoID').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
], categoriaDelete)

module.exports = router 
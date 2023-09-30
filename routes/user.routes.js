const { Router } = require('express')

const { usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch } = require('../controllers/user.controller')

const { check } = require('express-validator')

const {
    esAdminRole,
    tieneRol,
    validarCampos,
    validarJWT
} = require('../middlewares/exportaciones.middleware')

const { esRolValido,
    esEmailValido,
    existeId } = require('../helpers/db-validators')


const router = Router()
//! ejecutar la funcion: userGet(), ejecutar por referencia: userGet
router.get('/', usersGet)

router.post('/', [
    check('correo', 'el correo no es valido').custom((correo) => esEmailValido(correo)),
    //?check('rol', 'el rol no es valido').isIn(['ADMIN_ROLE', 'SUPER_USER_ROLE']),
    check('password', 'la contraseña es obligatoria y minimo 6 caracteres').notEmpty().isLength({ min: 6 }),
    check('nombre', 'el nombre es obligatorio').notEmpty(),
    check('rol').custom(esRolValido),
    //check('rol').custom((rol)=>esRolValido(rol)),
    validarCampos
], usersPost)//?el arreglo del centro van todos los middlewares

router.put('/:id', [
    check('id', 'el id no es valido').isMongoId(),
    check('id').custom(existeId),
    check('rol').custom((rol) => esRolValido(rol)),
    validarCampos
], usersPut)
router.patch('/', usersPatch)

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRol('ADMIN_ROLE', 'SUPER-USER_ROLE'),
    check('id', 'el id no es valido').isMongoId(),
    check('id').custom(existeId),
    validarCampos
], usersDelete)

module.exports = router
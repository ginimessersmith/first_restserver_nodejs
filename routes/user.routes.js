const { Router } = require('express')
const { usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch } = require('../controllers/user.controller')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos.middlewares.js')
const { esRolValido } = require('../helpers/db-validators')


const router = Router()
//! ejecutar la funcion: userGet(), ejecutar por referencia: userGet
router.get('/', usersGet)

router.post('/', [
    check('correo', 'el correo no es valido').isEmail(),
    //?check('rol', 'el rol no es valido').isIn(['ADMIN_ROLE', 'SUPER_USER_ROLE']),
    check('password', 'la contraseña es obligatoria y minimo 6 caracteres').notEmpty().isLength({ min: 6 }),
    check('nombre', 'el nombre es obligatorio').notEmpty(),
    check('rol').custom(esRolValido),
    //check('rol').custom((rol)=>esRolValido(rol)),
    validarCampos
], usersPost)//?el arreglo del centro van todos los middlewares

router.put('/:id', usersPut)
router.patch('/', usersPatch)

router.delete('/', usersDelete)

module.exports = router
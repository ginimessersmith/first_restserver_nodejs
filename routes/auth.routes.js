const { Router } = require('express')
const { check } = require('express-validator')
const { authLoginPost } = require('../controllers/auth.controller')
const { validarCampos } = require('../middlewares/exportsMiddleware')

const router = Router()

router.post('/login',[
    check('correo','el correo es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria y minimo 6 caracteres').notEmpty().isLength({min:6}),
    validarCampos
], authLoginPost)

module.exports = router 
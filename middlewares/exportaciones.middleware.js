const validarRoles = require('../middlewares/validarRoles.middlewares')
const validarCampos = require('../middlewares/validarCampos.middlewares.js')
const validarJWT = require('../middlewares/validarJWT.middleware')

module.exports={
    ...validarRoles,
    ...validarCampos,
    ...validarJWT
}
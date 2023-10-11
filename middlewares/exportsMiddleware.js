const validarRoles = require('./validarRoles.middlewares')
const validarCampos = require('./validarCampos.middlewares.js')
const validarJWT = require('./validarJWT.middleware')

module.exports={
    ...validarRoles,
    ...validarCampos,
    ...validarJWT
}
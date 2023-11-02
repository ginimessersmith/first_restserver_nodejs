const validarRoles = require('./validarRoles.middlewares')
const validarCampos = require('./validarCampos.middlewares.js')
const validarJWT = require('./validarJWT.middleware')
const validarArchivo = require('./validarArchivo.middleware')

module.exports = {
    ...validarRoles,
    ...validarCampos,
    ...validarJWT,
    ...validarArchivo,
}
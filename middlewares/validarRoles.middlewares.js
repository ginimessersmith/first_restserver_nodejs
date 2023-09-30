const { response, request } = require("express")

const esAdminRole = (req = request, res = response, next) => {
    if (!req.usuarioAutenticado) {
        return res.status(500).json({
            mensaje: 'esAdminRole se esta ejecutando antes del validarJWT'
        })
    }
    const { rol, nombre, correo } = req.usuarioAutenticado

    if (rol != 'ADMIN_ROLE') {
        return res.status(401).json({
            mensaje: `el usuario con el nombre: ${nombre} con correo: ${correo} , no esta autorizado a realizar esta accion`
        })
    }
    next()
}

const tieneRol = (...roles) => {
    return (req, res, next) => {
        if (!req.usuarioAutenticado) {
            return res.status(500).json({
                mensaje: 'tieneRol se esta ejecutando antes del validarJWT'
            })
        }
        const { nombre, correo } = req.usuarioAutenticado
        if (!roles.includes(req.usuarioAutenticado.rol)) {
            return res.status(401).json({
                mensaje: `el usuario con el nombre: ${nombre} con correo: ${correo} , no esta autorizado a realizar esta accion, debe tener al menos uno de estos roles: ${roles}`
            })
        }

        next()
    }
}

module.exports = { esAdminRole, tieneRol }
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

const validarJWT = async (req, res, next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            mensaje: 'Usuario no autorizado, no hay token en la peticion'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const usuarioAutenticado = await userModel.findById(uid)
        //? verificar si el usuario existe 
        if (!usuarioAutenticado) {
            return res.status(401).json({
                mensaje: 'El usuario no existe en la base de datos'
            })
        }
        //? verificar si el usuario autenticado no esta eliminado (estado = true)
        if (!usuarioAutenticado.estado) {
            return res.status(401).json({
                mensaje: 'El usuario no puede ingresar, hable con el administrador'
            })
        }
        req.usuarioAutenticado = usuarioAutenticado//? para añadir un atributo en la request
        //?console.log(usuarioAutenticado)
        next()
    } catch (error) {
        return res.status(401).json({
            mensaje: 'Usuario no autorizado, token no valido',
            error
        })
    }


}

module.exports = { validarJWT }
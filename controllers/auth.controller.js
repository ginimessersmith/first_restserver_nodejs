const { request, response } = require('express')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/generate-jwt')

const authLoginPost = async (req, res = response) => {

    const { correo, password } = req.body

    try {
        //?verificar si el correo existe
        const usuarioData = await User.findOne({ correo })
        if (!usuarioData) {
            return res.status(400).json({
                mensaje: 'el correo no existe'
            })
        }
        //?si el usuario esta activo
        if (usuarioData.estado == false) {
            return res.status(400).json({
                mensaje: 'el usuario no esta activo - estado:false'
            })
        }
        //?verificar la contraseña
        const validarPassword = bcrypt.compareSync(password, usuarioData.password)
        if (!validarPassword) {
            return res.status(400).json({
                mensaje: 'el password es incorrecto'
            })
        }
        //?generar el token jwt
        const token = await generarJWT(usuarioData.id)
        //?const { nombre: nombreUser, correo: correoUser, rol: rolUser, estado: estadoUser, google: googleUser } = usuarioData
        res.json({
            mensaje: 'controlador auth login post',
            usuarioData,
            token

        })
        console.log('ruta auth/login consumida con exito')

    } catch (error) {

        res.status(500).json({
            statuscode: 500,
            message: 'problemas en auth/login',
            error
        })

    }



}

module.exports = { authLoginPost }
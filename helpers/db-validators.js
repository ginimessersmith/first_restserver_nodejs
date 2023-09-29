const Role = require('../models/role')
const User = require('../models/user.model')
const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`el siguiente rol: ${rol} , no esta registrado en la BD`)
    }
}
const esEmailValido = async (correo = '') => {
    const existeEmail = await User.findOne({correo})

    if (existeEmail) {       
        throw new Error(`el siguiente email: ${correo} , ya esta registrado en la BD`)
    }
}

const existeId = async (id) => {
    
    const existeUsuarioPorID = await User.findById(id)
    if (!existeUsuarioPorID) {       
        throw new Error(`el siguiente ID: ${id} no existe  en la BD`)
    }
}

module.exports = { esRolValido,esEmailValido,existeId }
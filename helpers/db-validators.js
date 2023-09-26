const Role = require('../models/role')

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`el siguiente rol: ${rol} , no esta registrado en la BD`)
    }
}

module.exports={esRolValido}
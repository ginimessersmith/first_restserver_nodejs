const { Categoria, Producto } = require('../models/exportsModels')
const Role = require('../models/role')
const User = require('../models/user.model')
const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`el siguiente rol: ${rol} , no esta registrado en la BD`)
    }
}
const esEmailValido = async (correo = '') => {
    const existeEmail = await User.findOne({ correo })

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

const existeCategoriaId = async (id) => {

    const existeCategoria = await Categoria.findById(id)
    if (!existeCategoria) {
        throw new Error(`el siguiente ${id} no pertenece a ninguna categoria en la BD`)
    }

}

const existeProductoId = async (id) => {

    const existeProducto = await Producto.findById(id)
    if (!existeProducto) {
        throw new Error(`el siguiente ${id} no pertenece a ninguna categoria en la BD`)
    }

}

//? colecciones permitidas
const coleccionesPermitidas = async (coleccion, colecciones = []) => {

    const incluida = colecciones.includes(coleccion)
    if (!incluida) {
        throw new Error(`la coleccion ${coleccion} no es permitida`)
    }
    return true
}

module.exports = {
    esRolValido,
    esEmailValido,
    existeId,
    existeCategoriaId,
    existeProductoId,
    coleccionesPermitidas
}
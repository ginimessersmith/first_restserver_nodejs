const { isValidObjectId } = require("mongoose")
const userModel = require("../models/user.model")

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuario = async (termino = '', res) => {
    const esMongoId = isValidObjectId(termino)
    if (esMongoId) {
        const usuario = await userModel.findById(termino)
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    //? busqueda no sensible
    const regex= new RegExp(termino,'i')

    const usuarioNombre = await userModel.find({ 
        $or:[{nombre: regex},{correo: regex}],
        $and:[{estado:true}]
        
    })
    if (usuarioNombre) {
        return res.json({
            results: (usuarioNombre) ? [usuarioNombre] : []
        })
    }

    // const usuarioCorreo = await userModel.find({ correo: termino })
    // if (usuarioCorreo) {
    //     return res.json({
    //         results: (usuarioCorreo) ? [usuarioCorreo] : []
    //     })
    // }

}

const buscarGet = async (req, res) => {

    const { coleccion, terminoBuscar } = req.params

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.json({
            mensaje: `las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            await buscarUsuario(terminoBuscar, res)
            break;
        case 'categorias':

            break;
        case 'productos':

            break;

        default:
            return res.json({
                mensaje: 'no se incluyo ese elemento a buscar, 500, problema del backend'
            })

    }


}

module.exports = { buscarGet }
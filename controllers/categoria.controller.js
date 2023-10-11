//const { request: req, response: res } = require('express')
const { Categoria } = require('../models/exportsModels')

//? retornar todo - paginado - total y desde? - populate
const categoriaGet = async (req, res) => {
    const { limite = 5, desde = 1 } = req.query

    const [categorias, totalCategoria] = await Promise.all([
        Categoria.find({ estado: true }).limit(Number(limite)).skip(Number(desde)).populate('usuario', 'nombre'),
        Categoria.countDocuments({ estado: true })

    ])

    res.json({
        totalCategoria,
        categorias,

    })
}

//? retornar por id - populate
const categoriaGetId = async (req, res) => {
    const { id } = req.params
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre')
    res.json({
        categoria
    })
}

//? crear categoria
const categoriaPost = async (req, res) => {
    try {
        const nombre = req.body.nombre.toUpperCase()

        const categoriaDB = await Categoria.findOne({ nombre })

        if (categoriaDB) {//? si no es nulo, significa que la categoria existe
            return res.status(400).json({
                mensaje: `la categoria ${nombre} ya existe`
            })
        }

        //? GENERAR LA DATA A GUARDAR, evitar guardar el estado
        const data = {
            nombre,
            usuario: req.usuarioAutenticado._id
        }

        const categoria = await new Categoria(data)//? creando una nueva categoria
        await categoria.save()//? grabacion en la base de datos
        //console.log(req.usuarioAutenticado._id)
        res.json({
            mensaje: "ruta post categoria creada con exito",
            categoria
        })
    } catch (error) {
        return res.json({
            mensaje: `error en categoriaPost`,
            error
        })
    }
}

//? actualizar por id - buscar por nombre
const categoriaPut = async (req, res) => {

    const { id } = req.params

    const { estado, usuario, ...restoCategoria } = req.body//? pasos para actualizar
    restoCategoria.nombre = restoCategoria.nombre.toUpperCase()
    restoCategoria.usuario = req.usuarioAutenticado._id//? actualizar al usuario que modifico esto
    const categoria = await Categoria.findByIdAndUpdate(id, restoCategoria, { new: true })//? new:true para que se vea la nueva actualizacion
    res.json({
        mensaje: "ruta put categoria creada con exito",
        categoria
    })

    console.log('ruta categoria post consumida con exito')
}

//? eliminar por id - estado = false, para mantener integridad referencia
const categoriaDelete = async (req, res) => {
    const { id } = req.params
    //? const usuarioAutenticado = req.usuarioAutenticado, para ver si el usuario autenticado
    //?const usuario = await User.findByIdAndDelete(id) no recomendado
    const categoriaEliminada = await Categoria.findByIdAndUpdate(id, { estado: false },{new:true})
    res.status(200).json({        
        message: 'Eliminado con exito',
        categoriaEliminada,
    })
    console.log('ruta categoria (delete)/api lanzada con exito')

}

module.exports = {
    categoriaGet,
    categoriaGetId,
    categoriaPost,
    categoriaPut,
    categoriaDelete,
}
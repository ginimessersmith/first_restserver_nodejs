const { existeCategoriaId } = require('../helpers/db-validators')
const { Producto, Categoria } = require('../models/exportsModels')

const productosGet = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query


    const [productos, totalProducto] = await Promise.all([
        Producto.find({ estado: true })
            .limit(Number(limite))
            .skip(Number(desde))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre'),
        Producto.countDocuments({ estado: true })

    ])

    res.json({
        totalProducto,
        productos,

    })
}

const productoGetId = async (req, res) => { }

const productoPost = async (req, res) => {
    try {
        const { estado, usuario, ...restoProducto } = req.body//? el estado y usuario no se necesita

        const productoBuscar = await Producto.findOne({ nombre: restoProducto.nombre })

        if (productoBuscar) {
            return res.status(400).json({
                mensaje: 'el producto ya existe'
            })
        }

        const data = {
            ...restoProducto,
            nombre: restoProducto.nombre.toUpperCase(),
            usuario: req.usuarioAutenticado._id
        }

        const producto = await new Producto(data)
        await producto.populate('usuario', 'nombre')
        await producto.populate('categoria', 'nombre')

        await producto.save()
        res.status(201).json({
            producto
        })
    } catch (error) {
        console.log(error)
        return res.json({
            mensaje: 'error en la ruta producto/post',
            error
        })
    }
}

const productoPut = async (req, res) => {

    const { id } = req.params
    const { estado, usuario, ...restoProd } = req.body

    //?si viene el nombre del producto:
    if (restoProd.nombre) {
        restoProd.nombre = restoProd.nombre.toUpperCase()
    }

    // !CORREGIR LA EXISTENCIA DE LA CATEGORIA const existeCategoria = await Categoria.findById(restoProd.categoria)
    // console.log(existeCategoria)

    // if (!existeCategoria) {
    //     return res.json({
    //         mensaje: `el id: ${restoProd.categoria} no pertenece ninguna categoria`,
    //         categoria: restoProd.categoria
    //     })

    // }

    restoProd.usuario = req.usuarioAutenticado._id
    const producto = await Producto.findByIdAndUpdate(id, restoProd, { new: true })
    res.json({ producto })

}
const productoDelete = async (req, res) => {
    const { id } = req.params
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })
    res.json({ productoBorrado })
}

module.exports = {
    productosGet,
    productoGetId,
    productoPost,
    productoPut,
    productoDelete,
}
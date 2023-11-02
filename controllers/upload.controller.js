const path = require('path')
const fs = require('fs')
const { subirArchivo } = require("../helpers/subir-archivo")
const { Usuario, Producto } = require('../models/exportsModels')
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const upLoadGet = async (req, res) => {
    //? controlador actualizar imagen perfil usuario
    const pathImagenNotFound = path.join(__dirname, '../assets/noimage.jpg')
    const { coleccion, id } = req.params
    let modelo
    switch (coleccion) {
        case 'users':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.sendFile(pathImagenNotFound)
            }

            break;
        case 'producto':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.sendFile(pathImagenNotFound)
            }

            break;

        default:
            return res.status('500').json({
                mensaje: 'no es validado esto'
            })
    }

    if (modelo.image) {//? si existe la propiedad imagen en el modelo
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.image)
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }
    return res.sendFile(pathImagenNotFound)

}

const upLoadPost = async (req, res) => {


    // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    //     res.status(400).json({
    //         mensaje: 'no hay un archivo que subir'
    //     })
    //     return
    // }//! SE ENCUENTRA EN EL MIDDLEWARE

    // if (!req.files.archivo) {
    //     res.status(400).json({
    //         mensaje: 'no hay un archivo que subir'
    //     })
    //     return
    // }
    //extension de imagenes, ya esta por defecto
    //const pathArchivoCorregido = pathArchivo.replace(/\\/g,"\")
    //const pathArchivoCorregido = pathArchivo.replace(/\\/,"\\")
    try {
        //const nombreArchivo = await subirArchivo(req.files,['txt','md'],'textos')
        const nombreArchivo = await subirArchivo(req.files, undefined, 'imgs')
        res.json({
            nombreArchivo
        })
    } catch (error) {
        res.status(400).json({ error })
    }







}

// const upLoadPut = async (req, res) => {
//     //? controlador actualizar imagen perfil usuario

//     const { coleccion, id } = req.params
//     let modelo
//     switch (coleccion) {
//         case 'users':
//             modelo = await Usuario.findById(id)
//             if (!modelo) {
//                 return res.status(400).json({
//                     mensaje: `no existe el usuario con el id: ${id}`
//                 })
//             }

//             break;
//         case 'producto':
//             modelo = await Producto.findById(id)
//             if (!modelo) {
//                 return res.status(400).json({
//                     mensaje: `no existe el producto con el id: ${id}`
//                 })
//             }

//             break;

//         default:
//             return res.status('500').json({
//                 mensaje: 'no es validado esto'
//             })
//     }
//     //! limpiar imagenes previas.
//     if (modelo.image) {//? si existe la propiedad imagen en el modelo
//         const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.image)
//         if (fs.existsSync(pathImagen)) {
//             fs.unlinkSync(pathImagen)
//         }
//     }
//     const nombreImagen = await subirArchivo(req.files, undefined, coleccion)
//     modelo.image = nombreImagen
//     await modelo.save()
//     return res.json(modelo)

// }

const upLoadPutCloudinary = async (req, res) => {
    //? controlador actualizar imagen perfil usuario
    const { coleccion, id } = req.params
    let modelo
    switch (coleccion) {
        case 'users':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    mensaje: `no existe el usuario con el id: ${id}`
                })
            }

            break;
        case 'producto':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    mensaje: `no existe el producto con el id: ${id}`
                })
            }

            break;

        default:
            return res.status('500').json({
                mensaje: 'no es validado esto'
            })
    }
    //! limpiar imagenes previas.
    if (modelo.image) {//? si existe la propiedad imagen en el modelo
        //! hacer la limpieza
        const nombreArchivo=modelo.image.split('/')
        const nombre = nombreArchivo[nombreArchivo.length-1]
        const[idArchivo,extensionArchivo]=nombre.split('.')
        console.log(idArchivo,extensionArchivo)
        await cloudinary.uploader.destroy('Curso_Nodejs_ApiREST1/'+idArchivo)
        /**
         * Para eliminar una imagen que está en una carpeta en Cloudinary, debes incluir el nombre de la carpeta 
         * junto con el ID del archivo en el método destroy(). Así:
         * await cloudinary.uploader.destroy('nombreCarpeta/idArchivo');
         * Recuerda que debes reemplazar 'nombreCarpeta' y 'idArchivo' por los valores reales en tu caso. 
         * Cloudinary maneja las carpetas y archivos con una estructura de ruta similar a la de los sistemas tradicionales de archivos, 
         * por lo que puedes acceder a la imagen usando esta estructura de ruta en tu código.
         */
    }
    const {tempFilePath} = req.files.archivo//? extrayendo la ubicacion temporal del archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath,{folder:'Curso_Nodejs_ApiREST1'})
    modelo.image = secure_url
    await modelo.save()
    res.json(modelo)

    /**
     * const {tempFilePath} = req.files.archivo;
     * const result = await cloudinary.uploader.upload(tempFilePath, { folder: \"tu_carpeta_deseada\" });
     * const {secure_url} = result;En este caso,
     */

}


module.exports = {
    upLoadPost,
    upLoadPutCloudinary,
    upLoadGet,
}
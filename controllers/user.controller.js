const { request: req, response: res } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const { esEmailValido } = require('../helpers/db-validators')
const { generarJWT } = require('../helpers/generate-jwt')

const usersGet = async (req, res) => {
    //?ejemplo cuando ../api/users?q=hola&nombre=gino&apikey=123
    //?const params = req.query sin desestructuracion
    //?const { q, nombre, apikey } = req.query
    const { limite = 5, desde = 0 } = req.query

    //!! const usuarios = await User.find({ estado: true })//?se muestra todos los usuarios pero con la condicion({estado:true})
    //     .limit(Number(limite))
    //     .skip(Number(desde))

    //!! const totalUsuarios = await User.countDocuments({ estado: true })//?se cuenta todos los usuarios pero con la condicion({estado:true})
    //*desestructuracion de arreglos
    const [usuarios, totalUsuarios] = await Promise.all([
        User.find({ estado: true })
            .limit(Number(limite))
            .skip(Number(desde)),
        User.countDocuments({ estado: true })
    ])

    res.json({
        totalUsuarios,
        usuarios
    })


    //resultado sin desestructuracion: {"statuscode": 200,
    // "message": "hola mundo con JSON (get controller)",
    // "params": {
    //     "q": "hola",
    //     "nombre": "gino",
    //     "apikey": "123"
    // }

    // resultado con desestructuracion{
    //     "statuscode": 200,
    //     "message": "hola mundo con JSON (get controller)",
    //     "q": "hola",
    //     "nombre": "gino"
    // }
    console.log('ruta (get)/api lanzada con exito')
}


const usersPost = async (req, res) => {
    try {
        const body = req.body//?body desde la peticion
        const { nombre, correo, password, rol } = body
        const user = new User({ nombre, correo, password, rol })


        //?pasos a seguir:
        //! verificar si el parametro correo es un email
        //! verificar si el correo existe
        //esEmailValido(correo)
        //?la validacion se encuentra en la ruta: check('correo', 'el correo no es valido').custom((correo)=>esEmailValido(correo)),
        //! encriptar la contraseña
        const salt = bcrypt.genSaltSync()//?cuantas vueltas para la encriptacion
        //?hacer el hash de la contraseña:
        user.password = bcrypt.hashSync(password, salt)
        const token = await generarJWT(user.id)
        //!guardar en la base de datos
        await user.save()
        res.json({
            statuscode: 200,
            message: 'hola mundo con JSON (post controller)',
            //?mostrando el body:
            user,
            token
        })
        console.log('ruta (post)/api lanzada con exito')
    } catch (error) {
        res.json({
            statuscode: 500,
            message: 'problemas con la base de datos, controlador user metod post o internal server',
            //?mostrando el body:
            error
        })
    }

}


const usersPut = async (req, res) => {
    //const id=req.params.id//?optener el valor 20 desde ../api/users/20; otra forma:
    const { id } = req.params//?desestruturando
    const { _id, password, google, correo, ...restoBody } = req.body//?desestructurando lo que no necesito que no se grabe o lo que se va actualizar
    if (password) {//?si viene el password significa q el user quiere actualizar el password
        const salt = bcrypt.genSaltSync()
        //?crear un nuevo hash
        restoBody.password = bcrypt.hashSync(password, salt)
    }
    const usuario = await User.findByIdAndUpdate(id, restoBody)
    res.json({
        statuscode: 200,
        message: 'hola mundo con JSON (put controller)',
        id,
        usuario
    })
    // resultado:{
    //     "statuscode": 200,
    //     "message": "hola mundo con JSON (put controller)",
    //     "id": "2"
    // }
    console.log('ruta (put)/api lanzada con exito')
}

const usersPatch = (req, res) => {
    res.json({
        statuscode: 200,
        message: 'hola mundo con JSON (patch controller)'
    })
    console.log('ruta (put)/api lanzada con exito')
}

const usersDelete = async (req, res) => {
    const { id } = req.params
   //? const usuarioAutenticado = req.usuarioAutenticado, para ver si el usuario autenticado
    //?const usuario = await User.findByIdAndDelete(id) no recomendado
    const usuarioEliminado = await User.findByIdAndUpdate(id, { estado: false })
    res.json({
        statuscode: 200,
        message: 'Eliminado con exito',
        usuarioEliminado,

    })
    console.log('ruta (delete)/api lanzada con exito')
}
module.exports = {
    usersGet,
    usersDelete,
    usersPost,
    usersPut,
    usersPatch,

}
const { request: req, response: res } = require('express')
const bcyrpt = require('bcryptjs')
const User = require('../models/user.model')

const usersGet = (req, res) => {
    //?ejemplo cuando ../api/users?q=hola&nombre=gino&apikey=123
    //?const params = req.query sin desestructuracion
    const { q, nombre, apikey } = req.query
    res.json({
        statuscode: 200,
        message: 'hola mundo con JSON (get controller)',
        q,
        nombre,
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
        const{nombre,correo, password, rol}=body
        const user = new User({nombre,correo,password,rol})

        
        //?pasos a seguir:
       //! verificar si el parametro correo es un email
        //! verificar si el correo existe
        const existeEmail=await User.findOne({correo})

        if(existeEmail){
            return res.status(400).json({
                error:'ese correro ya existe'
            })
        }
        //! encriptar la contraseña
        const salt = bcyrpt.genSaltSync()//?cuantas vueltas para la encriptacion
        //?hacer el hash de la contraseña:
        user.password=bcyrpt.hashSync(password,salt)
        //!guardar en la base de datos
        await user.save()
        res.json({
            statuscode: 200,
            message: 'hola mundo con JSON (post controller)',
            //?mostrando el body:
            user
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


const usersPut = (req, res) => {
    //const id=req.params.id//?optener el valor 20 desde ../api/users/20; otra forma:
    const { id } = req.params//?desestruturando
    res.json({
        statuscode: 200,
        message: 'hola mundo con JSON (put controller)',
        id
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

const usersDelete = (req, res) => {
    res.json({
        statuscode: 200,
        message: 'hola mundo con JSON (delete controller)'
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
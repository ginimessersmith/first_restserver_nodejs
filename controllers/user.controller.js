const { request: req, response: res } = require('express')

const usersGet = (req, res) => {
    //?ejemplo cuando ../api/users?q=hola&nombre=gino&apikey=123
    //?const params = req.query sin desestructuracion
    const { q, nombre } = req.query
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


const usersPost = (req, res) => {
    const body = req.body//?body desde la peticion
    res.json({
        statuscode: 200,
        message: 'hola mundo con JSON (post controller)',
        //?mostrando el body:
        body
    })
    console.log('ruta (post)/api lanzada con exito')
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
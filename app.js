const express=require('express')
const app=express()
require('dotenv').config()
let port=process.env.PORT
app.get('/',(req,res)=>{
    res.send('hola mundo')
    console.log(`creado RESTserver con exito en el puerto: ${port}`)
}).listen(port)
console.log('hola mundo')
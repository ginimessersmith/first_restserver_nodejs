const express=require('express')
require('dotenv').config()

class Server{
    constructor(){
        this.app=express()
        this.port=process.env.PORT
        this.router()
    }

    router(){
        this.app.get('/',(req,res)=>{
            res.send('hola mundo')
            console.log('ruta / lanzada con exito')
        })
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`server corriendo en el puerto: ${this.port}`)
        })
    }
}

module.exports=Server
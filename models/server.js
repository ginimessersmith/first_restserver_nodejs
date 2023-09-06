const express = require('express')
require('dotenv').config()
const cors=require('cors')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuersRoutePath='/api/users'
        //middlewares
        
        this.middleware()
        this.router()
    }

    router() {
        this.app.use(this.usuersRoutePath,require('../routes/user.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`server corriendo en el puerto: ${this.port}`)
        })
    }

    middleware() {
        //?usando CORS
        this.app.use(cors())
        //? lectura y parseo del body:
        this.app.use(express.json())//* serializa la info en json
        // this.app.get('/products/:id', function (req, res, next) {
        //   res.json({msg: 'This is CORS-enabled for all origins!'})
        // })
        //?directorio a publicar
        this.app.use(express.static('public'))
    }
}

module.exports = Server
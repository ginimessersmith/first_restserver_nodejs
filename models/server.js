const express = require('express')
const bcyrpt = require('bcryptjs')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('../database/config.db')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersRoutePath = '/api/users'
        this.authRoutePath = '/api/auth'
        //?conectar a la db
        this.dbConnect()
        //?middlewares

        this.middleware()
        this.router()
    }

    async dbConnect() {
        await dbConnection()
    }

    router() {
        this.app.use(this.authRoutePath, require('../routes/auth.routes'))
        this.app.use(this.usersRoutePath, require('../routes/user.routes'))
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
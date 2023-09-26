const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS)
        console.log('base de datos: Online')

    } catch (error) {
        console.log(error)
        throw new Error('Error la inicializar la base de datos')
    }
}

module.exports = {
    dbConnection,
}
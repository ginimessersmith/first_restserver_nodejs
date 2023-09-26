const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'el correo es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'la contraseña es obligatorio'],

    },

    image: {
        type: String,
    },

    rol: {
        type: String,
        required: true,
        //enum: ['USER_ROLE', 'ADMIN_ROLE', 'SUPER_USER_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },

})



module.exports = model('User',UserSchema)
const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: ['true', 'el nombre es requerido'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: ['true', 'el estado es requerido'],

    },
    precio: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String,
        default: ''
    },
    disponible: {
        type: Boolean,
        default: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    image:{type:String},

})

ProductoSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject()
    return data
}

module.exports = model('Producto', ProductoSchema)
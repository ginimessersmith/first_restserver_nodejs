const { Router } = require('express')
const { buscarGet } = require('../controllers/buscar.controller')

const router = Router()
router.get('/:coleccion/:terminoBuscar', buscarGet)

module.exports = router
const { Router } = require('express')
const { usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch } = require('../controllers/user.controller')
const router = Router()
//! ejecutar la funcion: userGet(), ejecutar por referencia: userGet
router.get('/', usersGet)

router.post('/', usersPost)

router.put('/:id', usersPut)
router.patch('/', usersPatch)

router.delete('/', usersDelete)

module.exports = router
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { agregarUsuario } = require('./conecdb')

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', async (req, res) => {
    console.log('Entra por el post')
    const {nombre_usuario, email, passwd} = req.body
    const passwd_crypt = await bcrypt.hash(passwd, 8)
    await agregarUsuario({ nombre_usuario: nombre_usuario, email: email, contrasena_encriptada: passwd_crypt })
    res.redirect('login')
})

module.exports = router
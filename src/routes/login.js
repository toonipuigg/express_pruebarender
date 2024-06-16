const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { comprobarUsuario } = require('./conecdb')


router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', async (req, res) => {
    console.log('entra por el post')
    const {email, passwd} = req.body
    const passwd_crypt = await bcrypt.hash(passwd, 8)
    if (email === 'admin@gmail.com' && passwd === 'admin') {
        console.log('entra por el if');
        const token = jwt.sign({  }, 'administrador', {
            //expiresIn: '1m' // La sesión expira en un minuto
        })
        return res.redirect('vista_administrador/' + token);
    }
    await comprobarUsuario({ email: email, contrasena_encriptada: passwd_crypt }) 
    const token = jwt.sign({}, 'secreto', {
        //expiresIn: '1m' //La sesion experia en un minuto
    })
    res.redirect('catalogo/' + token)
})


module.exports = router
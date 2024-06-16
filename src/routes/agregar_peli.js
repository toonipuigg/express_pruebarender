const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {agregarPelis} = require('./conecdb')

router.get('/:token', (req, res) => {
    const token = req.params.token
    const verify = jwt.verify(token, 'agregar', (e) => {
        if(e){
            res.sendStatus(403)
            return false
        } else{
            res.render('agregar_peli')
            return true
        }
    })
    if(verify){
        console.log("verificado")
    }else{
        console.log("no verificado");
    }
})

router.post('/', async (req, res) => {
    console.log('entra al post')
    const token = jwt.sign({}, 'administrador',{

    })
    const {nombre_pelicula, portada, descripcion, precio} = req.body
    await agregarPelis({nombre_pelicula: nombre_pelicula, portada: portada, descripcion: descripcion, precio: precio})
    console.log('pelicula agregada a la base de datos')
    res.redirect('vista_administrador/' + token)
})

module.exports = router
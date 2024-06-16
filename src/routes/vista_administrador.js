const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {mostrarPelis, eliminarPelis} = require('./conecdb')

router.get('/:token', async (req, res) => {
    const peliculas = await mostrarPelis()
    const token = req.params.token
    const verify = jwt.verify(token, 'administrador', (e) => {
        if(e){
            res.sendStatus(403)
            return false
        } else{
            res.render('vista_administrador', {peliculas: peliculas})
            return true
        }
    })
    if(verify){
        console.log("Has entrado en la vista del administrador")
    }else {
        console.log("No has entrado en la vista deladministrador");
    }
})

router.post('/', (req, res) => {
    const token = jwt.sign({}, 'agregar', {
        // expiresIn: '5m' //La sesion expira en un 5mins
    })
    res.redirect('agregar_peli/' + token)
})

router.post('/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTc4MDAzMTF9.oWf9qBa-IP0jMCWKwdgNspyOnH4EW4D_-HEYwG2yscc', async (req, res) => {
    console.log('entrando')
    const {id_pelicula} = req.body
    const eliminar = await eliminarPelis(id_pelicula)
    const token = jwt.sign({}, 'administrador',{})
    if(eliminar){
        res.redirect('/vista_administrador/' + token)
    }else{
        console.log('No se ha podido eliminar') 
        res.redirect('/vista_administrador/' + token)
    }
})

router.post('/', (req, res) => {
    const token = jwt.sign({}, 'editar', {})
    res.redirect('editar_peli/' + token)
})

module.exports = router
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {mostrarPelis, editarPelis} = require('./conecdb')

router.get('/:token', async (req, res) => {
    const peliculas = await mostrarPelis()
    const token = req.params.token
    const verify = jwt.verify(token, 'editar', (e) => {
        if(e){
            res.sendStatus(403)
            return false
        }else {
            res.render('editar_peli', {peliculas: peliculas})
            return true
        }
    })
    if(verify){
        console.log('Has entrado en la vista de editar peliculas')
    }else{
        console.log('No has entrado en la vista de editar peliculas');
    }
})

router.post('/', (req, res) => {
    const token = jwt.sign({}, 'editar', {})
    res.redirect('editar_peli/' + token)
})

router.post('/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTc4NjA5Nzh9.hsXvWKFp50DumIsrVi02X-ZwenDrrGb_KoBavEKW91w', async (req, res) => {
    const {nombre_pelicula, portada, descripcion, precio} = req.body
    const token = jwt.sign({}, 'administrador', {})
    const editar = await editarPelis({nombre_pelicula: nombre_pelicula, portada: portada, descripcion: descripcion, precio: precio})
    if(editar){
        console.log("Se ha editado con exito la pelicula seleccionada")
        res.redirect('/vista_administrador/' + token)
    }else{
        console.log("No se ha editado con exito la pelicula seleccionada")
        res.redirect('/vista_administrador/' + token)
    }
})

module.exports = router
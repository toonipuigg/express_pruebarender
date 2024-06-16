const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {mostrarPelis} = require('./conecdb')

router.get('/:token', async (req, res) => {
    const token = req.params.token
    const peliculas = await mostrarPelis()
    const verify = jwt.verify(token, 'secreto', (e) => {
        if(e){
            res.sendStatus(403)
            return false
        } else{
            res.render('catalogo', {peliculas: peliculas})
            return true
        }
    })
    if(verify){
        console.log("verificado")
    }else{
        console.log("no verificado");
    }
})

module.exports = router
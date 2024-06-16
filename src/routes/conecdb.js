const mysql = require('mysql2/promise')
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASENAME
})

const agregarUsuario = async(usuario) => {
    await connection.execute('INSERT INTO usuarios (nombre_usuario, email, contrasena_encriptada) VALUES (?,?,?)', [usuario.nombre_usuario, usuario.email, usuario.contrasena_encriptada])
}
const comprobarUsuario = async(usuario) => {
    await connection.execute('select * from usuarios where email = ? and contrasena_encriptada = ?', [usuario.email, usuario.contrasena_encriptada])
}

const agregarPelis = async(peli) => {
    await connection.execute('INSERT INTO peliculas (nombre_pelicula, portada, descripcion, precio) VALUES (?,?,?,?)', [peli.nombre_pelicula, peli.portada, peli.descripcion, peli.precio])
}

const mostrarPelis = async() => {
    const [peliculas] = await connection.execute('SELECT * FROM peliculas')
    return peliculas
}

const eliminarPelis = async(id) => {
    try{
        await connection.execute('DELETE FROM peliculas WHERE id = ?', [id])
        return true
    }catch(err){
        console.log('Error al eliminar la pelicula')
        return false
    }
}

const editarPelis = async(peli) => {
    try{
        await connection.execute('UPDATE peliculas SET nombre_pelicula = ?, portada = ?, descripcion = ?, precio = ?', [peli.nombre_pelicula, peli.portada, peli.descripcion, peli.precio])
        return true
    }catch(err){
        console.log('Error al editar la pelicula')
        return false
    }
}

module.exports = {
    agregarUsuario,
    comprobarUsuario,
    agregarPelis,
    mostrarPelis,
    eliminarPelis,
    editarPelis
}
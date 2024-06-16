const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
const port = 3000


app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/')));

const inicioroute = require('./routes/inicio')
const registerroute = require('./routes/register')
const loginroute = require('./routes/login')
const catalogoroute = require('./routes/catalogo')
const vista_adminroute = require('./routes/vista_administrador')
const agregar_peliroute = require('./routes/agregar_peli')
const editar_peliroute = require('./routes/editar_peli')

app.use(morgan('dev'))

app.use('/', inicioroute)
app.use('/register', registerroute)
app.use('/login', loginroute)
app.use('/catalogo', catalogoroute)
app.use('/vista_administrador', vista_adminroute)
app.use('/agregar_peli', agregar_peliroute)
app.use('/editar_peli', editar_peliroute)
app.use((req, res, next) => {
    res.status(404).send('Error 404: Recurso no encontrado')
})
app.listen(port)
console.log(`Servidor escuchando en el puerto ${port}`);
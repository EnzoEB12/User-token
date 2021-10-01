// Importamos las librerías
const express = require('express');
const morgan = require('morgan');

// Inicializamos
require('dotenv').config();
require('./connection');
const app = express();


// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setttings
app.set('port', process.env.PORT || 4000);

// Routes
app.use(require('./routes/user.routes'));
 
//Ponemos el servidor en escucha...
app.listen(app.get('port'), ()=> console.log(`Server en linea en el puerto: ${app.get('port')}`))
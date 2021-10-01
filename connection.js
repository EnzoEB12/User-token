//Requerimos la libreria mongoose
const mongoose = require("mongoose");
// require('dotenv').config();

//Ejecutamos la conexion a la BD
//Llamamos al método .connect de mongoose
mongoose.connect(process.env.ATLAS, (err) => {
    if(err){
      console.error('ERROR AL CONECTAR DB: ', err);
    }
    console.log("Conectado a la base de datos")
});
  //.connect('mongodb://localhost:27017/dbserver')
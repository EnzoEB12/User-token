const { response } = require('express');


// Verifica si el usuario tiene permisos de administrador
const verficarAdmin = (req, res = response, next) => {
    const {role} = req.usuario;
    
    //console.log(role)

    //verificamos en la BD si el usuario tiene el rol de Admin
    if(role !== 'Administrador'){

        return res.status(401).json({
            msg:"No tiene permisos"
        })
    };

    

    next(); 
};

module.exports = {
    verficarAdmin
}
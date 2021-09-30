const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const User = require('../models/User');


const validar_jwt = async (req, res, next) => {
    const token = req.header('x-token');

    //Se verficia si viene el token en los headers
    if(!token){
        return res.status(401).json({
            msg: 'Token Inválido'
        });
    }


    //Si existe token

    try {
        const {id} = jwt.verify(token, process.env.SECRET)
        //console.log(id)
        if(!id){
            return res.status(401).json({
                msg: 'Token Inválido' 
            });
        }

         //buscar usuario en la base de datos
         const user = await User.findById(id);


         //Se valida el usuario
         if(!user){
            return res.status(401).json({
                msg: 'Token Inválido (no existe el usuario)' 
            });
         }
         
         req.usuario = user;
         

         next();


    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg:'Token inválido (general)'
        })
    }
}
module.exports = {
    validar_jwt
}
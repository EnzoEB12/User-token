const jwt = require('jsonwebtoken')

const generar_jwt = (id = '') => {
    
    return new Promise ( (resolve, reject) => {

        //identificar al usuario
        const payload = {
            id
        };
        
       jwt.sign(payload, process.env.SECRET, (err, token) => {
             
        if(err){
            reject('ERROR al general el token')
        }

        resolve(token)
       });
    });
};

module.exports = {
    generar_jwt
} 
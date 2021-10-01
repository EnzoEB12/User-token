const ctrlHome = {};
// Requerimos el modelo de datos de usuario 
const User = require('../models/User');

const {generar_jwt} = require('../helpers/generar_jwt')


// Devuelve todos los usuarios activos de la colección
ctrlHome.rutaGet = async (req, res) => {
    const users = await User.find({ activo: true }) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(users);
}



// Controlador que almacena un nuevo usuario
ctrlHome.rutaPost = async (req, res) => {
     // Desestructuramos la información recibida del cliente
    const { username, password,role } = req.body;
    // Se alamacena el nuevo usuario en la base de datos
    const user = new User({username, password,role});
    await user.save() 

    res.json({msg: 'El usuario se creo correctamente'});
}

// Controlador para login del usuario y devolver un token
ctrlHome.rutaLogin = async (req, res) => {
    const { username, password} = req.body;
    const user = await User.findOne({username, password});
   
   
    //Si no encuentra el usuario
    if(!user){
        return res.status(401).json({
            msg: "Usuario no existe"
        })
    };

    //verificamos si es un usuario activo
    if(!user.activo){
        res.status(401).json({
            msg: "Usuario no existe"
        })
    }

    //Si lo encuentra
    // Generar el token
    const token = await generar_jwt(user.id); 
    
    res.json({
        token     //se envia el token generado
    }); 
}


// Controlador que actualiza información de los usuarios
ctrlHome.rutaPut = async (req, res) => {
    const { username, password,role, id } = req.body

    const user = await User.findByIdAndUpdate(id, {username, password,role}, { new: true })
   
    res.json({
        msg: 'Usuario actualizado correctamente',
        user
    })
}

// Controlador para eliminar un usuario de la BD físicamente
ctrlHome.rutaDelete = async (req, res) => {
    const { id } = req.body;
    
    try {
        // Ejecución normal del programa
        await User.findByIdAndDelete(id)

        res.json({
            msg: 'Usuario eliminado correctamente'
        })
    } catch (error) {
        // Si ocurre un error 
        console.log('Error al eliminar el usuario: ', error)
    }
};

// Cambiar el estado activo de un usuario (Eliminación lógica)
ctrlHome.deleteUser = async (req, res) => {
    const { id }  = req.body
    const user = await User.findByIdAndUpdate(id, { activo: false }, { new: true });

    // Respuesta del servidor
    res.json({
        msg: 'Usuario eliminado correctamente',
        user
    });
}





module.exports = ctrlHome;
// Utilizamos el método Router de la librería express
const router = require('express').Router();

const {validar_jwt} = require('../middlewares/validar_jwt')
const {verficarAdmin} = require('../middlewares/validar_roles')
const { body } = require('express-validator');
const { validarCampos } = require ('../helpers/validar_campos');
const { siExisteRol, siExisteEmail } = require ('../middlewares/Validaciones');


// Requerimos los controladores (funciones que contendrán la lógica del endpoint)
 const {
     rutaGet, rutaPost, rutaLogin, rutaPut, rutaDelete, deleteUser
 } = require('../controllers/users.controllers')


//  Ruta para obtener todos los usuarios
router.get('/api/get-user', 
validar_jwt,
verficarAdmin,
rutaGet)


// Ruta para guardar un usuario
router.post('/api/create-user',
validar_jwt,
verficarAdmin,
body('username','El Email es incorrecto')
.isEmail()
.custom(siExisteEmail),
body('password','La contraseña debe contener 6 caracteres')
.isLength({min: 6})
.not()
.isEmpty(),
body('role', 'El rol no es valido')
.not()
.isEmpty()
.custom(siExisteRol),
validarCampos,
rutaPost)

router.post('/api/login-user', rutaLogin)

// Actualizar usuarios
router.put('/api/edit-user/:id',
validar_jwt,
verficarAdmin,
body('username','El Email es incorrecto').isEmail(),
body('password','La contrase debe contener 6 caracteres').isLength({min: 6}),
body('role', 'El rol no es valido').custom(siExisteRol),
body('id','La id no es valida').isMongoId(),
validarCampos, rutaPut)

// Ruta para eliminar un usuario - actualiza el estado
router.put('/api/desactivar-user/:id',
body('id','La id no es valida').isMongoId(), 
validar_jwt,
verficarAdmin,
deleteUser)


// Ruta para eliminar un usuario
router.delete('/api/delete-user/:id',body('id','La id no es valida').isMongoId(), 
validar_jwt,
verficarAdmin,
rutaDelete)


module.exports = router;

import { Router } from 'express'
import { registrar, autenticar, confirmar, olvidePassword, validarToken, nuevoPassword, perfil } from '../controllers/usuarioController.js'
import checkAuth from '../middlewares/checkAuth.js'

const router = Router()


// RUTAS PÚBLICAS
// Autenticación, Registro y Confirmación de Usuarios
router.post('/', registrar) // Crea un nuevo usuario
router.post('/login', autenticar) // Autenticar usuario
router.get('/confirmar/:token', confirmar) // Confirmar cuenta
router.post('/olvide-password', olvidePassword) // Solicita un token para recuperar el password
router.get('/olvide-password/:token', validarToken) // Valida el token para recuperar el password
router.post('/olvide-password/:token', nuevoPassword) // Almacena el nuevo password




// RUTAS PROTEGIDAS
router.get('/perfil', checkAuth, perfil ) // Obtiene el perfil del usuario


export default router
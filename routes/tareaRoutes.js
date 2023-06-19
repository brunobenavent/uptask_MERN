import { Router } from "express";
import { obtenerTareas } from "../controllers/proyectoController.js";
import {
        agregarTarea,
        obtenerTarea,
        actualizarTarea,
        eliminarTarea,
        cambiarEstado
} from "../controllers/tareaController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = Router()

router.post('/', checkAuth, agregarTarea)
// router.get('/', checkAuth, obtenerTareas)
router.get('/:id', checkAuth, obtenerTarea)    
router.put('/:id', checkAuth, actualizarTarea)
router.delete('/:id', checkAuth, eliminarTarea)
router.post('/estado/:id', checkAuth, cambiarEstado)

export default router
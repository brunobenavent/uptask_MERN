import { Router } from "express";
import {obtenerProyectos,
        nuevoProyecto,
        obtenerProyecto,
        editarProyecto,
        eliminarProyecto,
        agregarColaborador,
        eliminarColaborador
    } from "../controllers/proyectoController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = Router()

router.get('/', checkAuth, obtenerProyectos)
router.post('/', checkAuth, nuevoProyecto)
router.get('/:id', checkAuth, obtenerProyecto)
router.put('/:id', checkAuth, editarProyecto)
router.delete('/:id', checkAuth, eliminarProyecto)
router.post('/agregar-colaborador/:id', checkAuth, agregarColaborador)
router.post('/eliminar-colaborador/:id', checkAuth, eliminarColaborador)





export default router
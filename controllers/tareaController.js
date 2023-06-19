import { Types } from "mongoose"
import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js"

const agregarTarea = async(req, res) => {
    const {proyecto: proyectoId} = req.body

    let proyecto
    if(Types.ObjectId.isValid(proyectoId)){
        proyecto = await Proyecto.findById(proyectoId)
    }else{
        const error = new Error('El proyecto no fue encontrado')
        return res.status(404).json({msg: error.message})
    }

    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no valida');
        return res.status(401).json({msg: error.message})
    }
    const tarea = new Tarea(req.body)
    try {
        const tareaAlmacenada = await tarea.save()
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error.message)
    }
}

const obtenerTarea = async(req, res) => {
    console.log('obteniendo tareas')
}

const actualizarTarea = async(req, res) => {
    console.log('editando tarea')
}

const eliminarTarea = async(req, res) => {
    console.log('eliminando tarea')
}

const cambiarEstado = async(req, res) => {
    console.log('obteniendo tareas')
}

export{
    obtenerTarea,
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}
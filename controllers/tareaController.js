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
        proyecto.tareas.push(tarea._id)
        res.json(tareaAlmacenada)
        await proyecto.save()
    } catch (error) {
        console.log(error.message)
    }
}

const obtenerTarea = async(req, res) => {
    const {id} = req.params

    let tarea
    if(Types.ObjectId.isValid(id)){
        tarea = await Tarea.findById(id).populate('proyecto')
    }else{
        const error = new Error('La Tarea no fue encontrada')
        return res.status(404).json({msg: error.message})
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no valida');
        return res.status(403).json({msg: error.message})
    }
    res.json(tarea)
}

const actualizarTarea = async(req, res) => {
    const {id} = req.params

    let tarea
    if(Types.ObjectId.isValid(id)){
        tarea = await Tarea.findById(id).populate('proyecto')
    }else{
        const error = new Error('La Tarea no fue encontrada')
        return res.status(404).json({msg: error.message})
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no valida');
        return res.status(403).json({msg: error.message})
    }

    try {
        const tareaAlmacenada = await Tarea.findByIdAndUpdate(id, req.body, {new: true})
        res.json(tareaAlmacenada)
        
    } catch (error) {
        console.log(error.message)
    } 
}

const eliminarTarea = async(req, res) => {
    const {id} = req.params

    let tarea
    if(Types.ObjectId.isValid(id)){
        tarea = await Tarea.findById(id).populate('proyecto')
    }else{
        const error = new Error('La Tarea no fue encontrada')
        return res.status(404).json({msg: error.message})
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no valida');
        return res.status(403).json({msg: error.message})
    }

    try {

        const tareaEliminada = await Tarea.findByIdAndDelete(id)
        res.json(tareaEliminada)
        
    } catch (error) {
        console.log(error.message)
    }
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
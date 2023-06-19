import { Types } from "mongoose"
import Proyecto from "../models/Proyecto.js"

const obtenerProyectos = async(req, res) => {
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario._id)
    res.json(proyectos)
}

const nuevoProyecto = async(req, res) => {

     const proyecto = new Proyecto(req.body)
     proyecto.creador = req.usuario._id
     try {
        const proyectoAlmacendo = await proyecto.save()
        res.json(proyectoAlmacendo)
     } catch (error) {
        return res.status(401).json({msg: error.message})
     }
}

const obtenerProyecto = async (req, res) => {
    const { id } = req.params;
    let proyecto;
    
    if(Types.ObjectId.isValid(id)){
      proyecto = await Proyecto.findById(id);
    } else { 
      const error = new Error('El proyecto no fue encontrado');
      return res.status(404).json({ msg: error.message});
    }
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
      const error = new Error('Acción no valida');
      return res.status(401).json({msg: error.message})
    }
    res.json(proyecto);
  }


const editarProyecto = async(req, res) => {
    const { id } = req.params;
    let proyecto;
    
    if(Types.ObjectId.isValid(id)){
      proyecto = await Proyecto.findById(id);
    } else { 
      const error = new Error('El proyecto no fue encontrado');
      return res.status(404).json({ msg: error.message});
    }
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
      const error = new Error('Acción no valida');
      return res.status(401).json({msg: error.message})
    }
    proyecto.nombre = req.body.nombre || proyecto.nombre
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega
    proyecto.cliente = req.body.cliente || proyecto.cliente
    try {
        const proyectoEditado = await proyecto.save()
        res.json(proyectoEditado)
        
    } catch (error) {
        console.log(error.message)
    }
}



const eliminarProyecto = async(req, res) => {
    const { id } = req.params;
    let proyecto;
    
    if(Types.ObjectId.isValid(id)){
      proyecto = await Proyecto.findById(id);
    } else { 
      const error = new Error('El proyecto no fue encontrado');
      return res.status(404).json({ msg: error.message});
    }
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
      const error = new Error('Acción no valida');
      return res.status(401).json({msg: error.message})
    }
    try {
        await proyecto.deleteOne()
        res.json({msg: "El proyecto fué eliminado correctamente"})
        
    } catch (error) {
        console.log(error.message)
    }
}

const agregarColaborador = async(req, res) => {
     
}

const eliminarColaborador = async(req, res) => {
     
}

const obtenerTareas = async(req, res) => {
     
}

export{
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas
}
import { Types } from "mongoose"
import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js"
import Usuario from "../models/Usuario.js"

const obtenerProyectos = async(req, res) => {
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario._id).select('-tareas')
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
      proyecto = await Proyecto.findById(id).populate('tareas').populate('colaboradores', 'nombre email')
    } else { 
      const error = new Error('El proyecto no fue encontrado');
      return res.status(404).json({ msg: error.message});
    }
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
      const error = new Error('Acción no valida');
      return res.status(401).json({msg: error.message})
    }

    res.json(proyecto)
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

const buscarColaborador = async(req, res) => {
    const {email} = req.body

    // Verificar que el usuario existe
    const usuario = await Usuario.findOne({email}).select('-password -confirmado -createdAt -updatedAt -__v -token')
    if(!usuario){
      const error = new Error('El usuario que desea agregar no existe')
      return res.status(404).json({msg: error.message})
    }
    
    res.json(usuario)


}

const agregarColaborador = async(req, res) => {
    const {email} = req.body
    const {id} = req.params

    // Verificar que el usuario existe
    const usuario = await Usuario.findOne({email}).select('-password -confirmado -createdAt -updatedAt -__v -token')
    const proyecto = await Proyecto.findById(id)
    if(!proyecto) {
      const error = new Error('El Proyecto no se encontró')
      return res.status(404).json({msg: error.message})
    }

    if(!usuario){
      const error = new Error('El usuario que desea agregar no existe')
      return res.status(404).json({msg: error.message})
    }
     // Verificar que el que esta añadiendo al colaborador es el creador del proyecto
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
      const error = new Error('Acción no válida')
      return res.status(404).json({msg: error.message})
    }

     // Verificar que no se está intentando agragar de colaborador al creador
      if(req.usuario._id.toString() === proyecto.creador.toString()){
        const error = new Error('Eres el creador, no puedes añadirte a tí mismo')
        return res.status(404).json({msg: error.message})
      }
      if(proyecto.colaboradores.includes(usuario._id)){
        const error = new Error('El colaborador ya estaba agregado al proyecto')
        return res.status(404).json({msg: error.message})
      }
      try {
        proyecto.colaboradores = [...proyecto.colaboradores, usuario._id]
        await proyecto.save()
        res.json({msg: 'Colaborador agregado correctamente'})
      } catch (error) {
        console.log(error.message)
      }
}

const eliminarColaborador = async(req, res) => {
    const {id} = req.params

    const proyecto = await Proyecto.findById(id)
    if(!proyecto) {
      const error = new Error('El Proyecto no se encontró')
      return res.status(404).json({msg: error.message})
    }
     // Verificar que el que esta eliminando al colaborador es el creador del proyecto
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
      const error = new Error('Acción no válida')
      return res.status(404).json({msg: error.message})
    }

     // Verificar que no se está intentando eliminar al creador
      if(req.usuario._id.toString() === proyecto.creador.toString()){
        const error = new Error('Eres el creador, no puedes eliminarte a tí mismo')
        return res.status(404).json({msg: error.message})
      }
    
      try {
        proyecto.colaboradores.pull(req.body.id)
        console.log(colaboradores)
        return

        await proyecto.save()
        res.json({msg: 'Colaborador eliminado correctamente'})
      } catch (error) {
        console.log(error.message)
      }
}

export{
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    buscarColaborador,
    agregarColaborador,
    eliminarColaborador
}
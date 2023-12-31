import {Schema, model, Types} from "mongoose";


const tareaSchema = Schema({
    nombre:{
        type: String,
        trim: true,
        required: true
    },
    descripcion:{
        type: String,
        trim: true,
        required: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    fechaEntrega:{
        type: Date,
        required: true,
        default: Date.now()
    },
    prioridad:{
        type: String,
        required: true,
        enum: ["Baja", "Media", "Alta"]
    },
    proyecto:{
        type: Types.ObjectId,
        ref: 'Proyecto'
    }
}, {timestamps: true})

const Tarea = model('Tarea', tareaSchema)

export default(Tarea)
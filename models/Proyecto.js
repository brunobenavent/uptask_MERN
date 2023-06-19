import {Schema, model, Types} from "mongoose";


const proyectosSchema = Schema({
    nombre:{
        type: String,
        trim: true,
        required: true
    },
    nombdescripcionre:{
        type: String,
        trim: true,
        required: true
    },
    fechaEntrega:{
        type: Date,
        default: Date.now()
    },
    cliente:{
        type: String,
        trim: true,
        required: true
    },
    creador:{
        type: Types.ObjectId,
        ref: 'Usuario'
    },
    colaboradores: [
        {
            type: Types.ObjectId,
            ref: 'Usuario' 
        }
    ]
}, {timestamps: true})

const Proyecto = model('Proyecto', proyectosSchema)

export default(Proyecto)
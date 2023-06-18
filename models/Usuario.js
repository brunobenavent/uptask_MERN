import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
import { generarId } from "../helpers/generarId.js";

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

usuarioSchema.pre("save", async function(next){
    if(!this.isModified('password')) next() // Si no está modificando el password, no hagas nada, ho hasees lo haseado.
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
usuarioSchema.methods.comprobarPassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

usuarioSchema.methods.toJSON = function(){
    const {__v, password, confirmado,    _id, ...usuario} = this.toObject();
    usuario.uid = _id

    return usuario
}

const Usuario = model('Usuario', usuarioSchema)
export default Usuario 
import { generarId } from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"
import Usuario from "../models/Usuario.js"

const registrar = async(req, res) => {
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({email})
    if(existeUsuario){
        const error = new Error('El email ya está registrado')
        return res.status(400).json({msg: error.message}) 
    }
    try {
        const usuario = new Usuario(req.body)
        const usuarioAlmacenado = await usuario.save()
        
        res.json(usuarioAlmacenado)
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}

const autenticar = async(req, res) => {
    const { email, password } = req.body
    const usuario = await Usuario.findOne({email})

    // Validamos que el usuario exista en la db
    if(!usuario){
        const error = new Error('Usuario no encontrado')
        return res.status(400).json({msg: error.message}) 
    }

    // Comprobamos si el usuario está confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada todavía')
        return res.status(403).json({msg: error.message}) 
    }

    // Comprobamos que el password sea correcto
    if(!await usuario.comprobarPassword(password)){
        const error = new Error('El password introducido no es correcto')
        return res.status(403).json({msg: error.message}) 
    }
    usuario.token = generarJWT(usuario._id)

    res.json({usuario})
}

const confirmar = async(req, res) => {
    const {token} = req.params
    //Comprobar que el token es válido
    const usuario = await Usuario.findOne({token})
    if(!usuario){
        const error = new Error('Token no válido')
        return res.status(401).json({msg: error.message}) 
    }
    
    try {
        usuario.token = '' 
        usuario.confirmado = true
        await usuario.save()
        res.json({msg: "Usuario Confirmado Correctamente"})
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}
const olvidePassword = async(req, res) => {
    const {email} = req.body
    const usuario = await Usuario.findOne({email})

    // Validamos que el usuario exista en la db
    if(!usuario){
        const error = new Error('Usuario no encontrado')
        return res.status(400).json({msg: error.message}) 
    }
    try {
        usuario.token = generarId()
        await usuario.save()
        res.json({msg: 'Hemos enviado un email con las instrucciones para resetear tu password'})
    } catch (error) {
        res.json({msg: error.message})
    }
}
const validarToken = async(req, res) => {
    const {token} = req.params
    //Comprobar que el token es válido
    const usuario = await Usuario.findOne({token})
    if(!usuario){
        const error = new Error('Token no válido')
        return res.status(401).json({msg: error.message}) 
    }
    res.json({msg: 'Token validado'})
}
const nuevoPassword = async(req, res) => {
    const {token} = req.params
    const {password} = req.body
    //Comprobar que el token es válido
    const usuario = await Usuario.findOne({token})
    if(!usuario){
        const error = new Error('Token no válido')
        return res.status(401).json({msg: error.message}) 
    }
    usuario.password = password
    usuario.token = ''
    try {
        await usuario.save()
        res.json({msg: 'Password modificado correctamente'})
    } catch (error) {
        res.json({msg: error.message})
    }
}
const perfil = async(req, res) => {
    const {usuario} = req
    res.json(usuario)
}

export {
    registrar, 
    autenticar,
    confirmar,
    olvidePassword,
    validarToken,
    nuevoPassword,
    perfil
}
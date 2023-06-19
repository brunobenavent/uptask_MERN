import express from 'express'
import cors from 'cors'

import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'

import conectarDB from './config/db.js'
import 'dotenv/config'


const app = express()


// Conexión a la base de datos
conectarDB()

//******** MIDDLEWARES *********
// Habilitar el parseo de las respuestas de tipo JSON
app.use(express.json())

// Habilitar CORS
// const dominiosPermitidos = [process.env.FRONTEND_URL]
// const corsOptions = {
//     origin: function (origin, callback){
//         if(dominiosPermitidos.indexOf(origin) !== -1 ){
//             callback(null, true)
//         }else{
//             callback(new Error ('No permitido por CORS'))
//         }
//     }
// }
// app.use(cors(corsOptions)) 

// Routing
app.use('/api/usuarios',usuarioRoutes )
app.use('/api/proyectos', proyectoRoutes )
app.use('/api/tareas', tareaRoutes )


const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> console.log(`Servidor Escuchando en el puerto ${PORT}`))
import jwt from 'jsonwebtoken'

const generarJWT = (id) => jwt.sign({id}, process.env.SECRETORPRIVATEKEY, {expiresIn:'30d'})

export default generarJWT
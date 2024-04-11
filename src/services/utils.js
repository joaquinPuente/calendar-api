import path from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export async function hashPassword(password){
    const saltRound = 10;
    try {
        const hashPassword = await bcrypt.hash(password,saltRound)
        return hashPassword
    } catch (error) {
        throw new Error('Error to hash')
    }
}

export async function verifyPassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword)
        return match
    } catch (error) {
        throw new Error('Not valid password')
    }
}

export async function generateAccesToken(user){
    return jwt.sign(user, 'clave-secreta', {expiresIn: '5m'} )
}

export async function validateToken(req,res,next){
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
        res.status(401).send('Acceso denegado (validateToken)');
    }
    jwt.verify(accessToken, 'clave-secreta', (err,user)=>{
        if(err){
            res.status(401).send('Acceso denegado, token expirado o incorrecto');
        } else {
            req.user = user;
            next();
        }
    });
}
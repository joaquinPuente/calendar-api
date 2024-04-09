import { Router } from "express";
import jwt from "jsonwebtoken"
import UserController from "../../controllers/user.controller.js";

const router = Router();

function generateAccesToken(user){
    return jwt.sign(user, 'clave-secreta', {expiresIn: '5m'} )
}

function validateToken(req,res,next){
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

router.get('/test', validateToken, async(req,res)=>{
    try {
        res.json({message: 'Token válido para acceder!', username: req.user});
    } catch (error) {
        res.status(401).send('Acceso denegado, token expirado o incorrecto');
    }
});

router.get('/users', UserController.getAllUsers );

router.get('/login', async (req,res)=>{
    try {
        res.render('login');
    } catch (error) {
        res.json('Error al traer la vista login', error);
    }
});

router.post('/login', UserController.login )

router.get('/register', async (req,res)=>{
    try {
        res.render('register');
    } catch (error) {
        res.json('Error al traer la vista register', error);
    }
});

router.post('/register', UserController.registerUser );

export default router;

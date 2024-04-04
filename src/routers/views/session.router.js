import { Router } from "express";
import jwt from "jsonwebtoken"

const router = Router();

const users = [
    {
    username:'joacopuente',
    password:'1234'
    },

]

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

router.get('/login', async (req,res)=>{
    try {
        res.render('login');
    } catch (error) {
        res.json('Error al traer la vista login', error);
    }
});

router.post('/login', async (req,res)=>{
    const { username, password} = req.body;
    const date = new Date();
    const yearNow = date.getFullYear();
    // Buscar el usuario en la lista
    const user = users.find(user => user.username === username);
    if(user){
        // Verificar la contraseña
        if(password === user.password){
            const accessToken = generateAccesToken(user);
            // Establecer el token como cookie
            res.cookie('accessToken', accessToken, { httpOnly: true });
            res.redirect(`/calendar/${yearNow}`);
        } else {
            res.status(401).json('Acceso denegado, contraseña incorrecta');
        }
    } else {
        res.status(401).json('Acceso denegado, usuario no encontrado');
    }
});

router.get('/register', async (req,res)=>{
    try {
        res.render('register');
    } catch (error) {
        res.json('Error al traer la vista register', error);
    }
});

router.post('/register', async (req,res)=>{
    const { username, password} = req.body;
    try {
        const newUser = { username, password }
        console.log('newUser: ',newUser);
        users.push(newUser)
        res.redirect('/login')
    } catch (error) {
        res.json('Register Error', error)
    }
});

export default router;

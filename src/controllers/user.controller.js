import UserService from "../services/user.service.js";
import userModel from "../dao/models/user.model.js"; // Importar UserModel
import { hashPassword, verifyPassword } from "../services/utils.js";


export default class UserController {

    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).send(users);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async createUser(req, res) {
        try {
            const newUser = await UserService.createUser(req.body);
            res.status(201).send(newUser);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const userId = req.params.userId;
            const user = await UserService.findUserById(userId);
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async updateUserById(req, res) {
        try {
            const userId = req.params.userId;
            const userData = req.body;
            const updatedUser = await UserService.updateUserById(userId, userData);
            if (updatedUser) {
                res.status(200).send(updatedUser);
            } else {
                res.status(404).send({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async deleteUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await userModel.findById(userId);
            await UserService.deleteUserById(userId); // Añadir await
            res.send('usuario eliminado');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async registerUser(req, res){
        const { first_name, last_name, email, password, age, birthday } = req.body;
        try {
            const data = { first_name, last_name, email, password: await hashPassword(password), age, birthday };
            const newUser = await UserService.createUser(data);
            res.status(201).redirect('/login')
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
    
    static async login(req, res) {
        const { email, password } = req.body;
        const date = new Date();
        const yearNow = date.getFullYear();
        
        try {
            let user = await UserService.findUserByEmail(email)
            user = user[0]

            if (!user || user.length == 0) {
                throw new Error('User not found');
            }

            const passwordIsValid = await verifyPassword(password, user.password );
    
            if (passwordIsValid) {
                res.redirect(`/calendar/${yearNow}`);
            } else {
                res.status(401).send('Access denied, incorrect password');
            }
        } catch (error) {
            res.status(401).send('Access denied, user not found');
        }
    }
    
}

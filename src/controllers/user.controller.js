import UserService from "../services/user.service.js";

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
          res.status(200).send(`User: ${user}`)
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
          await UserService.deleteUserById(userId);
          res.send('usuario eliminado')
        } catch (error) {
          res.status(500).send({ error: error.message });
        }
    }

    static async registerUser(req,res){
      const { first_name, last_name, email, password, age, birthday } = req.body;
      try {
          const data = { first_name, last_name, email, password, age, birthday }
          await UserController.createUser(data)
          res.redirect('/login')
      } catch (error) {
          res.json('Register Error', error)
      }
    }

    static async login(req,res){
      const users = [
        {
        username:'joacopuente',
        password:'1234'
        },]
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
    }
}
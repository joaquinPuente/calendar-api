import UserService from "../services/user.service.js";

export default class UserController {

    static async getAllUsers(req, res) {
      try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }

    static async createUser(req, res) {
        try {
          const newUser = await UserService.createUser(req.body);
          res.status(201).json(newUser);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
          const userId = req.params.userId;
          const user = await UserService.findUserById(userId);
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).json({ message: 'User not found' });
          }
          res.status(200).json(`User: ${user}`)
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

    static async updateUserById(req, res) {
        try {
          const userId = req.params.userId;
          const userData = req.body;
          const updatedUser = await UserService.updateUserById(userId, userData);
          if (updatedUser) {
            res.status(200).json(updatedUser);
          } else {
            res.status(404).json({ message: 'User not found' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

    static async deleteUserById(req, res) {
        try {
          const userId = req.params.id;
          const user = await userModel.findById(userId);
          await UserService.deleteUserById(userId);
          res.json('usuario eliminado')
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

}
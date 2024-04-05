import UserDao from "../dao/user.mongodb.dao.js";

export default class UserService {

    static async getAllUsers (){
        try {
            const user = UserDao.get()
            return user
        } catch (error) {
            throw new Error(`Error to get all users: ${error.message}`)
        }
    }

    static async createUser(data) {
        try {
            const newUser = await UserDao.create(data);
            return newUser;
        } catch (error) {
            throw new Error(`Error to create user: ${error.message}`);
        }
    }

    static async findUserById(uid) {
        try {
            const user = await UserDao.getById(uid);
            return user;
        } catch (error) {
            throw new Error(`Error get user by ID: ${error.message}`);
        }
    }

    static async updateUserById(uid,data) {
        try {
            const user = await UserDao.updateById(uid,data)
            return user
        } catch (error) {
            throw new Error(`Error update user by ID: ${error.message}`);
        }
    }

    static async deleteUserById(uid) {
        try {
            const user = await UserDao.deleteById(uid);
            return user;
        } catch (error) {
            throw new Error(`Error get user by ID: ${error.message}`);
        }
    }


}
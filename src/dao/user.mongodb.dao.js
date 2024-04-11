import userModel from "./models/user.model.js"

export default class UserDao {
    
    static async create(data){
        const newUser = new userModel(data);
        return await newUser.save();
    }    

    static async get(criteria={}){
        const user = userModel.find(criteria);
        return user
    }

    static async getById(uid){
        const user = userModel.findById(uid);
        return user
    }

    static async updateById(uid,data){
        return userModel.updateOne({id:uid},{$set:data});
    }

    static async deleteById(uid){
        return userModel.deleteOne({_id:uid})
    }
    
}
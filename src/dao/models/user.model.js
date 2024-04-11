import mongoose from "mongoose";

const userModel = mongoose.Schema({
    first_name: {type:String, required: true},
    last_name: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    age: {type:Number},
    birthday: {type:Date},
    dates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Date' }]
})

export default mongoose.model('User', userModel)

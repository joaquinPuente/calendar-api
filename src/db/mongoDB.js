import mongoose from "mongoose";
import config from "../config/config.js";

export const init = async ()=>{
    try {
        await mongoose.connect(config.mongodb_uri)
        console.log('Database connected 😎');
    } catch (error) {
        console.log('Error to connect DB');
    }
}
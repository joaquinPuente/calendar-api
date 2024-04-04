import mongoose from "mongoose"

const dateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User' }
})

export default mongoose.model('Date', dateSchema)
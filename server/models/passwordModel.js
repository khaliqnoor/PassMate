import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    userId: String,
    password: String,
    username: String,
    url: String
},{timestamps: true})

const Pass = mongoose.model('Pass', passwordSchema)

export default Pass
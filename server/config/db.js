import mongoose from 'mongoose'

const connectDb = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDb is connected ")
    } catch (error) {
        console.log('mongodb error', error)
    }
}

export default connectDb
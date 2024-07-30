import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        // console.log("Connection done Successfully")
        // console.log(connectionInstance)
        console.log(`DB connected!:${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("DB connection failed ERROR:", error.message)
        process.exit(1)
    }
    
}

export default connectDB;


import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    } catch (error) {
        console.log("MongoDb connection Failed", error);
        process.exit(1)
    }
    
}
export default connectDB;
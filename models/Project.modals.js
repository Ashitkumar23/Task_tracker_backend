import mongoose,{Schema} from "mongoose";

const projectSchema = new mongoose.Schema({
    userId:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true
    },
    title:{ 
        type: String, required: true 
    }
})

export const Project = mongoose.model("Project", projectSchema)
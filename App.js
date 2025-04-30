import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors(
    {origin: "http://localhost:5173",  
    credentials: true,}  
))
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("Public"));
app.use(cookieParser())


import authRoutes from "./routes/authRoutes.js"
import projectRoutes from "./routes/project.Routes.js"
import taskRoutes from "./routes/task.Routes.js"

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);


export {app}
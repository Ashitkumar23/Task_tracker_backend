import { Router } from "express";
import { verifyjwt } from "../middlewares/authMiddleware.js";
import { createProject, deleteProject, getProjects } from "../controllers/project.Controller.js";

const router = Router()
router.use(verifyjwt)
router.route("/").get(getProjects)
router.route("/").post(createProject)
router.route("/:id").delete(deleteProject)

export default router
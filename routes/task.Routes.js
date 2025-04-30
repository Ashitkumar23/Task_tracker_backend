import { Router } from "express";
import { verifyjwt } from "../middlewares/authMiddleware.js";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController.js";

const router = Router()

router.use(verifyjwt)
router.get('/:projectId/tasks', getTasks);
router.post('/:projectId/tasks', createTask);
router.put('/:projectId/tasks/:id', updateTask);
router.delete('/:projectId/tasks/:id', deleteTask);


export default router
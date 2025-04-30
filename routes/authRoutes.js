import {Router} from "express"
import { login, signin } from "../controllers/authController.js"

const router = Router();

router.route("/signup").post(signin)
router.route("/login").post(login)


export default router

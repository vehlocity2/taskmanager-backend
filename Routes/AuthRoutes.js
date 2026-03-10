import express from "express"
import AuthController from "../controller/AuthController.js"

const router = express.Router()

router.post("/register", AuthController.SignUp)
router.post("/login", AuthController.SignIn)

export default router
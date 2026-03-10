import express from "express"
const router = express.Router()
import VerifyUser from "../middleware.js/VerifyUser.js"
import TaskController from "../controller/TaskController.js"

router.post("/task", VerifyUser, TaskController.createTask)
router.get("/tasks", VerifyUser, TaskController.getTasks)
router.put("/task/:id", VerifyUser, TaskController.updateTask)
router.delete("/task/:id", VerifyUser, TaskController.deleteTask)

export default router
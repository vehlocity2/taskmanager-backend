import Task from "../models/TastModel.js"


const createTask = async (req, res) =>{
    const { title, description } = req.body
    const userId = req.user.id
    try {
        const newTask = new Task({
            title,
            description,
            userId

        })
        await newTask.save()
        res.status(201).json({ message: "Task created successfully", task: newTask})
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message})
    }
}

const getTasks = async (req, res) =>{
    const userId = req.user.id
    try {
        const tasks = await Task.find({ userId })
        res.status(200).json({ message: "Tasks retrieved successfully", tasks })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message})
    }
}

const updateTask = async (req, res) =>{
    const { id } = req.params
    const userId = req.user.id
    try {
        const task = await Task.findOne({_id: id, userId})
        if(!task){
            return res.status(404).json({ message: "Task not found"})
        }
        task.status = "completed"
        await task.save()
        res.status(200).json({ message: "Task updated successfully", task })    
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message})
    }
}

const deleteTask = async (req, res) =>{
    const { id } = req.params
    const userId = req.user.id
    try {
        const task = await Task.findOneAndDelete({_id: id, userId})
        if(!task){
            return res.status(404).json({ message: "Task not found"})

        }
        res.status(200).json({ message: "Task deleted successfully", task})
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message})
    }
}

export default {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}
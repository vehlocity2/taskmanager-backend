import jwt from "jsonwebtoken"
import Auth from "../models/AuthModel.js"


const SignIn = async (req, res) =>{
    const { email, password } = req.body
    try {
        const user = await Auth.findOne({ email })
        if(!user){
            return res.status(404).json({ message: "User not found"})
        }
        if(user.password !== password){
            return res.status(401).json({ message: "Email or password is incorrect"})
        }
        const payLoad = {
            email: user.email,
            id: user._id
        }
        console.log("Payload for JWT:", payLoad)
        const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: "1h"})
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: false
        }).status(200).json({ message: "Signin successful", token })
        console.log("Generated JWT token:", token) 
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

const SignUp = async (req, res) =>{
    const { email, password } = req.body
    try {
        const existingUser = await Auth.findOne({ email })
        if(existingUser){
            return res.status(400).json({ message: "User already exists"})
        }
        const newUser = new Auth({
            email,
            password
        })
        await newUser.save()
        res.status(201).json({ message: "User created successfully", user: newUser })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export default {
    SignIn,
    SignUp
}
import jwt from "jsonwebtoken"

const VerifyUser = async(req, res, next) =>{
    const token = req.cookies.access_token
    console.log("Token from cookie:", token)
    if(!token) {
        const authHeader = req.headers.authorization
        if(authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1]
        }
    }
    if(!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Decoded JWT payload:", decoded)
        req.user = decoded
        next()
    } catch (error) {
        console.error("JWT verification error:", error)
        res.status(401).json({ message: "Unauthorized: Invalid token", error: error.message })
    }
}

export default VerifyUser
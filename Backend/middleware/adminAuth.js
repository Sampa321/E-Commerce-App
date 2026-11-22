import jwt from "jsonwebtoken"



export async function adminAuth(req,res,next){
    try {
        const {token} = req.headers;
        if(!token)
        {
            return res.status(401).json({success : false, message : "Not authorized login again"})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded admin token:", token_decode);
        console.log("Admin email from env:", process.env.ADMIN_EMAIL);
        if(token_decode.role !== "admin" ||
            token_decode.email !== process.env.ADMIN_EMAIL){
            return res.status(401).json({success : false, message : "Not authorized login again"})
        }
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({success : false, message : error.message})
    }
}





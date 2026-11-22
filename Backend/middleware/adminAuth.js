import jwt from "jsonwebtoken"



export async function adminAuth(req,res,next){
    try {
        const {token} = req.headers;
        if(!token)
        {
            return res.status(401).json({success : false, message : "Not authorized login again"})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(token_decode !== process.env.ADMIN_EMAIL +process.env.ADMIN_PASSWORD){
            
            return res.status(401).json({success : false, message : "Not authorized login again"})
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({success : false, message : "Not authorized login again"})
    }
}





// when authenticated add, update the cart or user will place the order

// convert user token to userId
import jwt from "jsonwebtoken";

export default async function authUser(req, res, next){
    const token = req.headers.token;

    if(!token)
    {
        return res.json({success : false, message : 'Not Authorized Login Again'})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = token_decode.id;
        console.log("========== AUTH DEBUG ==========");
        console.log("Decoded Token:", token_decode);
        console.log("Authenticated User ID:", req.userId);
        next();
    } catch (error) {
        console.log(error);
        res.json({success : false, message : error.message});
    }
}
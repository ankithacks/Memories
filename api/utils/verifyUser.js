import jwt from "jsonwebtoken";
export const verifyToken=(req,res, next)=>{
    // npm i cookie-parser
    const token=req.cookies.access_token;
    if(!token){
        return next(errorHandler(401,"unauthorized"))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
        if(err) return next(errorHandler(401,"Forbidden token access"))

        req.user=user
        next()
    })

}
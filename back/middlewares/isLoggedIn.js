import jwt from "jsonwebtoken"

export const isLoggedIn = (req,res,next)=>{
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];
        if(!token){
            return res.status(200).send("login first");
        }
        let userData = jwt.verify(token,process.env.JWT_SECRET_KEY);
   
     req.user = userData;
     next();
    }

    catch(err){
        res.status(500).send(err.message);
    }
}
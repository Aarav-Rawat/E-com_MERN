import jwt from "jsonwebtoken"

export const isLoggedIn = (req,res,next)=>{
    try{
      if(!req.cookies.token){
       return res.send("login");
    }

     let userData = jwt.verify(req.cookies.token,process.env.JWT_SECRET_KEY);
     req.user = userData;
     next();
    }

    catch(err){
        res.status(500).send(err.message);
    }
}
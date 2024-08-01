
export const isLoggedIn = (req,res,next)=>{
    try{
      if(!req.cookies.token){
       return res.send("login first");
    }
     next();
    }

    catch(err){
        res.status(500).send(err.message);
    }
}
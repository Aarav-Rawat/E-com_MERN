import jwt from "jsonwebtoken"

 const genToken = (user)=>{
    return jwt.sign({email: user.email,userId: user._id},
        process.env.JWT_SECRET_KEY
    )
}

export default genToken;
import jwt from 'jsonwebtoken';
import 'dotenv/config'

const authMiddleware=async(req,res,next)=>{
    const{token}=req.headers;
    if(!token)
    {
        return res.json({
            success:false,
            message:'not an authrized user as token is missing'
        })
    }

try{
    const token_decode=jwt.verify(token,process.env.JWT_SECRET);
    req.body.userId=token_decode.id;
    next();

}catch(error)
{
    return res.json({
        success:false,
        message:error.message+'Error in autherization in middleware'
    })
}



}





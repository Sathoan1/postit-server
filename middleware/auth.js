const jwt= require ('jsonwebtoken')

const auth= async (req, res, next)=>{
     const authHeaders= req.headers.authorization
     if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        return res.status(401).json({message: 'Unauthorized'})
     }
    //  getting token
     const token = authHeaders.split(' ')[1]
     try{
     const payload= jwt.verify(token, process.env.JWT_SECRET);
     req.user= {userId: payload.userId, username: payload.username};
     next();
     }catch(error){
     return res.status(401).json({message: 'Unauthorized'})
     }
}

module.exports= auth 
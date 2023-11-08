const Users= require('../models/user')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const handleError= require('../utils/error')

const registerUser= async(req, res)=>{
     try{
     const user= await Users.create(req.body);
     res.status(201).json({
        success: true,
        user: {email: user.email, username: user.username},
     })
     }catch(error){
        const errors= handleError(error);
        res.status(400).json(errors)
     }
}

const logInUser= async(req,res)=> {
    const {email, password}= req.body
    try{
     const user = await Users.findOne({ email})
     if(!user){
    throw Error('no user')
     }
     const isCorrect= await bcrypt.compare(password, user.password)
     if (!isCorrect){
        throw Error('invalid')
     }
    //  generate token jwt
    const token = jwt.sign({userId: user._id, username: user.username},
         process.env.JWT_SECRET,
         {expiresIn: '1d'}
         );
    res.status(200).json({
        success: true,
        user: {email: user.email, username: user.username},
        token,
    })
    }catch(error){
        console.log(error);
        const errors= handleError(error);
        res.status(400).json(errors)
    }
};

const getUser = async (req, res)=>{
    const {username}= req.user
    res.status(200).json({ success: true, username});
}

module.exports= {registerUser,logInUser, getUser }
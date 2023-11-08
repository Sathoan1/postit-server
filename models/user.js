const mongoose = require('mongoose');
const {  isEmail } = require('validator');
const Schema = mongoose.Schema;
const bcrypt= require('bcryptjs')

const userSchema= new Schema ({
    username:{
        type: String,
        unique: true,
        minLength: 6,
        trim: true,
        required: true,
    },
    email:{
        type: String,
        required:true,
        trim:  true,
        validate: isEmail,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 7,
        trim: true,
    },
},
{timestamps: true}
)

userSchema.pre('save', async function (next){
    // hash password
    const salt= await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password, salt);
    next()
})
module.exports= mongoose.model('User', userSchema);
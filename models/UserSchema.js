const { Schema, model } = require("mongoose");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const UserSchema=new Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
       
    },
    role_id:{
        type:String,
        default:0,
        enum:[0,1,2]
    },
    // tokens:[
    //     {
    //         token:{
    //             type:String,
    //             required:true
    //         }
    //     }
    // ]
})
UserSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
    }
    next();
})



const User=model("userData",UserSchema)
module.exports=User
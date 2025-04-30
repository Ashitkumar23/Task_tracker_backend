import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    }
})

userSchema.pre("save",async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

userSchema.methods.comparePassword = function (password){
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken =  function () {
   return  jwt.sign(
       {
          _id : this._id,
          email: this.email,
          username: this.username,
          fullname: this.fullname
       },
       process.env.ACCES_TOKEN_SECRET,
       {
          expiresIn: process.env.ACCES_TOKEN_EXPIRY
       }
    )  
 }
 userSchema.methods.generateRefreshToken =  function () {
   return  jwt.sign(
       {
          _id : this._id,
          email: this.email,
       },
       process.env.REFRESH_TOKEN_SECRET,
       {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
       }
    )  
 }

export const User = mongoose.model("User", userSchema)

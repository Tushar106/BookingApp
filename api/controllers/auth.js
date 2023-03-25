import User from "../models/User.js"
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import  Jwt  from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        await newUser.save();
        res.status(200).send("User has been created")

    } catch (error) {
        // console.log(error)
        next(error)
    }
}

export const login = async (req, res, next) => {
    
    try {
        const user=await User.findOne({username:req.body.username})
        if(!user){
            return next(createError(404,"User not found"))
        }

        const isPasswordCorrect= await bcrypt.compareSync(req.body.password, user.password);
        if(!isPasswordCorrect) return next(createError(400,"Wrong Password"));

        const token=Jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)

        //password return naa hoo iss liye
       const {password ,isAdmin , ...other}=user._doc
        res.cookie("access_token",token,{
            httpOnly:true
        })
        .status(200).json(other);

    } catch (error) {
        next(error)
    }
}
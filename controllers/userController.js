import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import user from '../models/user.js'

export const signIn = async(req,res)=>{
    const {email,password} = req.body
    try{
        const existingUser = await user.findOne({email})
        if(!existingUser){
            return res.status(400).json({message:"user don't exist password"})
        }
        const isPassword = await bcrypt.compare(password,existingUser.password)
        if(!isPassword) return res.status(400).json({message:"inavlid credentails"})
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:'1h'})
        return res.status(200).json({result:existingUser,token})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Something went wrong"})
    }
}

export const signUp = async(req,res)=>{
    const {email,password,confirmPassword,firstName,lastName} = req.body

    try{
        const existingUser = await user.findOne({email})
        if(existingUser) return res.status(400).json({message:"user already exist"})

        if(password !== confirmPassword) return res.status(400).json({message:"password didn't match"})
        const hashedPassword = await bcrypt.hash(password,12)
        const resultUserData = await user.create({email,password:hashedPassword,name:`${firstName} ${lastName}`})
        const token = jwt.sign({email:resultUserData.email,id:resultUserData._id},'test',{expiresIn:'1h'})
        return res.status(200).json({result:resultUserData,token})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Something went wrong"})
    }
}


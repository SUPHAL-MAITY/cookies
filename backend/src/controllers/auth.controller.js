import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import {randomInt} from "crypto"


import { User } from "../models/user.model.js";
import twilio from 'twilio';



import jwt from  "jsonwebtoken";


dotenv.config()



const client=  twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)










const otpSendController=asyncHandler(async(req,res)=>{
    const {countryCode,phone}=req.body
    console.log(process.env.TWILIO_ACCOUNT_SID)
   


    const message = await client.messages.create({
        body: "This is the ship that made the Kessel Run in fourteen parsecs?",
         from: '+16812442355',
        to: '+919804137946'
      });
   

    return res.status(200).json(new ApiResponse(200,message ,"otp sent successfully"))



})


const loginController=asyncHandler(async(req,res)=>{

    const {phone}=req.body;

    if(!phone){
        throw new ApiError(400,"phone number necessary while logging in")
    }

    const user=await User.findOne({phone})
    console.log("user",user)
    if(!user){
        throw new ApiError(400,"user not found while logging in")
    }


    ///compare method defined in user schema

    // const isPasswordValid=await user.comparePassword(password)
    // if(!isPasswordValid){
    //     throw new ApiError(400,"password is not valid")
    // }




    const otp=randomInt(1000,9999).toString()
    console.log(otp)

    console.log("user_id",user._id)


    const payload={
        otp,
        user:user._id.toString(),
        
       }


       const option={
        expiresIn:process.env.OTP_TOKEN_EXPIRY
    }

    console.log("OTP_TOKEN_EXPIRY",process.env.OTP_TOKEN_EXPIRY)


///**************************************open later because its costly */
  
    // const message = await client.messages.create({
    //     body: `your verification code for blog app is ${otp}`,
    //      from: '+16812442355',
    //      to:`+${user.countryCode}${user.phone}`
    //   });

    //   if(!message){
    //     throw new ApiError(400,"message not sent")
    //   }

    
    
   
   
const otpToken= jwt.sign(payload,process.env.OTP_TOKEN_SECRET,option)
   

   
const options={
    maxAge: 3600000, 
    httpOnly: true,  
    secure: false,   
    sameSite: 'lax' 
}


const resUser=await User.findOne({_id:user._id}).select("-password -refreshToken")




return res.status(200).cookie("otpToken",otpToken,options).json(new ApiResponse(200,{user:resUser},"otp sent successfully" ))
   





})


const validateOtpController=asyncHandler(async(req,res)=>{
    const {otp}=req.body
   

    if( !otp){
        throw new ApiError(400,"otp  is missing")
    }
    //// otp token is taken from cookies 
    console.log(req.cookies)

    const otpToken=req.cookies.otpToken

    console.log("req.cookies.otpToken",req.cookies.otpToken)

    

    if(!otpToken ){
        throw new ApiError(400,"otp token  is missing")
    }


    const decodedOtpToken=jwt.decode(otpToken)
    console.log("decoded otpToken",decodedOtpToken)


    ////match the otp ????????????????????????????????????????

    if(otp!==decodedOtpToken.otp){
        throw new ApiError(400,"otp is not valid or expired.....please login again")
    }


   const user= await User.findById(decodedOtpToken.user)

   if(!user){
    throw new ApiError(400,"user not found while validating otp")
   }

   const accessToken=user.generateAccessToken()
   const refreshToken=user.generateRefreshToken()

   user.refreshToken=refreshToken
   await user.save()


 


    
   

    return res.status(200).cookie("accessToken",accessToken).cookie("refreshToken",refreshToken).json(new ApiResponse(200,{},"otp verified successfully"))



})









export {otpSendController,loginController,validateOtpController}
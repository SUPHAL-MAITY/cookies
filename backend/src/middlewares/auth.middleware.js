import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";


const verifyJwtToken=asyncHandler(async(req,res,next)=>{


    const accessToken=req.cookies.accessToken;

    ////if access token is missing 

    if(!accessToken){

        const refreshToken= req.cookies.refreshToken

        if(!refreshToken){
        throw new ApiError(401,"Access token  and refresh token both are missing please login again")
        }

        ///check refresh token is valid or not

        let decodedRefreshToken;

         // const decodeRefreshToken=jwt.decode(refreshToken)
        try {

        // If the refresh token is valid, this will return the decoded payload

         decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); 

          } catch (err) {

           // If the refresh token is invalid, an error will be thrown and we handle it here
            throw new ApiError(401, "Refresh token is invalid.");

        }


       

        


        const user=await User.findById(decodedRefreshToken._id)

        if(!user){
            throw new ApiError(401,"user not found in refresh token")
        }   

        req._id=decodedRefreshToken._id ;

        next()

    }



// Verify the access token
  let decoded;
  try {
    // Verify and decode the access token
    decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET); 
  } catch (err) {
    throw new ApiError(401, "Access token is not valid.");
  }




    console.log(" access token decoded  in middleware",decoded)


    const user=await User.findById(decoded._id)

    if(!user){
        throw new ApiError(401,"user  does not exist (middleware)")
    }


    //now req._id will be available for other controllers

    req._id=decoded._id ;

    console.log("user id  in the middleware",decoded._id)

    next()

})




const isAdmin=asyncHandler(async(req,res,next)=>{
    const _id=req._id;
    const user=await User.findById(_id)
    if(!user){
        throw new ApiError(400,"user not found in sdmin  check middleware")
    }

    if(user.role!="admin"){
        throw new ApiError(400,"user is not admin in middleware")
    }

    next()
})




export {verifyJwtToken,isAdmin}
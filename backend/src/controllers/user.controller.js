import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js" 


const createUserController=asyncHandler(async(req,res)=>{
    const {name,email,countryCode,phone,password,role,profileUrl}=req.body;
    if([name,email,countryCode,phone,password,role,profileUrl].some((value)=>value?.trim()==="")){
        throw new ApiError(400,"All fields are necessary while creating a user")
    }

    const exisingUser=await User.findOne({email})

    if(exisingUser){
        throw new ApiError(400,"user already exists")
    }

    const user=await User.create({name,email,countryCode,phone,password,role,profileUrl})
    if(!user){
        throw new ApiError(400,"user not created")
    }

    return res.status(200).json(new ApiResponse(200,{},"User Created Sucessfully"))

})


const editUserController=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const {name,email,countryCode,phone,password,role,profileUrl}=req.body;
    if([name,email,countryCode,phone,password,role,profileUrl].some((value)=>value?.trim()==="")){
        throw new ApiError(400,"All fields are necessary while creating a user")
    }
    const user=await User.findByIdAndUpdate({_id:id},{name,email,countryCode,phone,password,role,profileUrl})
    if(!user){
        throw new ApiError(400,"user not updated")
    }
    return res.status(200).json(new ApiResponse(200,{},"User Updated Sucessfully"))
})

const deleteUserController=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const user=await User.findByIdAndDelete({_id:id})
    if(!user){
        throw new ApiError(400,"user not deleted")
    }
    return res.status(200).json(new ApiResponse(200,{},"User Deleted Sucessfully"))
})

const getAllUsersController=asyncHandler(async(req,res)=>{
    const users=await User.find({})
    if(!users){
        throw new ApiError(400,"users not found")
    }
    return res.status(200).json(new ApiResponse(200,{users,length:users.length}," all users fetched sucessfully"))
})


const changeuserRoleController=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    if(!id){
        throw new ApiError(400,"id is necessary")
    }
    const {role}=req.body;
    if(!role){
        throw new ApiError(400,"role is necessary")
    }
    const user=await User.findById({_id:id})
    if(!user){
        throw new ApiError(400,"user not found")
    }

    //// role of admin can not be changed

   if(user.role=="admin"){
    throw new ApiError(400,"admin cannot be changed")
   }

   const updatedUser=await User.findByIdAndUpdate({_id:id},{role})
   if(!updatedUser){
        throw new ApiError(400,"user not updated")
    }

   
    return res.status(200).json(new ApiResponse(200,{},"User Role Updated Sucessfully"))
})





export {createUserController,editUserController,deleteUserController,getAllUsersController,changeuserRoleController}
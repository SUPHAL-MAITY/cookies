import { Blogs } from "../models/blogs.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const createBlogcontroller=asyncHandler(async(req,res)=>{


    const {title,content,author,category,imageUrl}=req.body;

    if([title,content,author,category,imageUrl].some((value)=>value?.trim()==="")){
        throw new ApiError(400,"All fields are necessary while creating a blog")
    }


    const blog=await Blogs.create({title,content,author,category,imageUrl})

    if(!blog){
        throw new ApiError(400,"blog not created")
    }

    return res.status(200).json(new ApiResponse(200 ,blog,"blog created successfully"))
    
   


})

const deleteBlogController=asyncHandler(async(req,res)=>{

    const {id}=req.params;

    if(!id){
        throw new ApiError(400,"id  not found while deleting a blog")
    }

    await Blogs.findByIdAndDelete({_id:id})

    return res.status(200).json(new ApiResponse(200,{},"blog deleted successfully"))
   


})


const updateBlogController=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const {title,content,author,category}=req.body;
    if([title,content,author,category].some((value)=>value?.trim()==="")){
        throw new ApiError(400,"All fields are necessary while updating a blog")
    }
    const blog=await Blogs.findByIdAndUpdate({_id:id},{title,content,author,category})
    if(!blog){
        throw new ApiError(400,"blog not updated")
    }
    return res.status(200).json(new ApiResponse(200,blog,"blog updated successfully"))
})


const getAllBlogsController=asyncHandler(async(req,res)=>{
    const blogs=await Blogs.find({}).populate("author","name").exec()
    if(!blogs){
        throw new ApiError(400,"blogs not found")
    }

    return res.status(200).json(new ApiResponse(200,{blogs,length:blogs.length},"blogs fetched successfully"))
})



const getRecentBlogsController=asyncHandler(async(req,res)=>{
     console.log("req",req.cookies)
    const blogs=await Blogs.find({}).sort({createdAt:-1}).limit(12).populate("author","name").exec()
     if(!blogs){
        throw new ApiError(400,"blogs not found")
    }
    return res.status(200).json(new ApiResponse(200,blogs,"recent blogs fetched successfully"))
})

const getSingleBlogController=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const blog=await Blogs.findById(id).populate("author","name").exec()
    if(!blog){
        throw new ApiError(400,"blog not found")
    }
    return res.status(200).json(new ApiResponse(200,blog,"blog fetched successfully"))
})



const getOwnBlogsController=asyncHandler(async(req,res)=>{
    
    const {id}=req.query

    const ownBlogs=await Blogs.find({author:id}).populate("author","name").exec()

    if(!ownBlogs){
        throw new ApiError(400,"blogs not found")
    }

    return res.status(200).json(new ApiResponse(200,{ownBlogs,length:ownBlogs.length},"own blogs fetched successffully"))


})


const getBlogsByPageController=asyncHandler(async(req,res)=>{

  

    const page=parseInt(req.query.page) || 1;
    const pageSize=parseInt(req.query.pageSize) || 2 ;

    const totalBlogs=await Blogs.countDocuments();
    const totalPage=Math.ceil(totalBlogs/pageSize)


    const skipBlogs=(page-1)*pageSize;

    const blogs=await Blogs.find({}).skip(skipBlogs).limit(pageSize).sort({createdAt:-1})
    if(!blogs){
        throw new ApiError(400,"blogs not found")
    }
    return res.status(200).json(new ApiResponse(200,{blogs,pageSize:blogs.length,totalBlogs,totalPage}," page wise blogs fetched successfully",))  
})







export {createBlogcontroller,deleteBlogController,updateBlogController,getAllBlogsController,getBlogsByPageController,getRecentBlogsController,getSingleBlogController,getOwnBlogsController};
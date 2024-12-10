import { Router } from "express";

import { createBlogcontroller, deleteBlogController, getAllBlogsController, getBlogsByPageController, getOwnBlogsController, getRecentBlogsController, getSingleBlogController, updateBlogController } from "../controllers/blog.controller.js";
import { verifyJwtToken } from "../middlewares/auth.middleware.js";






const router=Router()




router.route("/create-blog").post(createBlogcontroller)
router.route("/delete-blog/:id").delete(deleteBlogController)
router.route("/update-blog/:id").post(updateBlogController)
router.route("/all-blogs").get(getAllBlogsController)
router.route("/recent").get(getRecentBlogsController)
router.route("/blogs-by-page").get(getBlogsByPageController)
router.route("/single-blog/:id").get(getSingleBlogController)
router.route("/get-own-blogs").get(getOwnBlogsController)




export default router;
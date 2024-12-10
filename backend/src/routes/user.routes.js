import { Router } from "express";
import { changeuserRoleController, createUserController, deleteUserController, editUserController, getAllUsersController } from "../controllers/user.controller.js";


const router=Router()


router.route("/create-user").post(createUserController)
router.route("/update-user/:id").post(editUserController)
router.route("/delete-user/:id").delete(deleteUserController)
router.route("/getall-user").get(getAllUsersController)
router.route("/change-role/:id").post(changeuserRoleController)



export default router;

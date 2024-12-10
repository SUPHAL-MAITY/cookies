import { Router } from "express";
import { loginController, otpSendController, validateOtpController } from "../controllers/auth.controller.js";











const router=Router()





router.route("/send-otp").post(otpSendController)
router.route("/login").post(loginController)
router.route("/verify").post(validateOtpController)



export default router;
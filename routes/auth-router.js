import express from "express";
import { validateBody } from "../helpers/index.js";
import { registerSchema, emailSchema} from "../models/user-model.js";
import authController from "../controllers/authController.js";
import { isEmptyBody, authValidation, upload } from "../middlewares/index.js";
export const authRouter = express.Router();

const userRegisterValidate = validateBody(registerSchema);
const userEmailValidate = validateBody(emailSchema);

authRouter.get("/verify/:verificationCode", authController.verifyEmailController);
authRouter.post("/verify", userEmailValidate, authController.resendVerifyEmailController)

authRouter.post(
  "/register", upload.single("avatar"), isEmptyBody, userRegisterValidate,
  authController.registerController
);
authRouter.post(
  "/login",
  userRegisterValidate,
  authController.loginController
);
authRouter.post("/logout", authValidation, authController.logoutController);
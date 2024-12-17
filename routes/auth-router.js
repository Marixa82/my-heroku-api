import express from "express";
import { validateBody, ctrlWrapper } from "../helpers/index.js";
import { registerSchema} from "../models/user-model.js";
import { loginController, registerController, logoutController } from "../controllers/auth-controller.js";
import authValidation from "../middlewares/authValidation.js";
export const authRouter = express.Router();

authRouter.get("/verify/:verificationCode", ctrlWrapper(verifyEmailController));
// authRouter.post(
//   "/verify",
//   validateBody(emailSchema),
//   ctrlWrapper(resendVerifyEmailController)
// );
authRouter.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(registerController)
);
authRouter.post(
  "/login",
  validateBody(registerSchema),
  ctrlWrapper(loginController)
);
authRouter.post("/logout", authValidation, ctrlWrapper(logoutController));
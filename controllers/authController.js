import { User } from "../models/user-model.js";
import gravatar from "gravatar";
import bcryptjs from "bcryptjs";
import { ctrlWrapper, HttpError, sendEmail } from "../helpers/index.js";
import path from 'path';
import jwt from 'jsonwebtoken';
import { randomUUID } from "crypto";

const {
  JWT_SECRET,
  BASE_URL,
  FRONTEND_URL,
} = process.env;
const avatarPath = path.resolve("public", "avatars");

const registerController = async (req, res) => {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }

    const avatarURL = gravatar.url(email);
    if (req.file) {
      const { path: oldPath, filename } = req.file;
      const newPath = path.join(avatarPath, filename);
      await fs.rename(oldPath, newPath);
      avatarURL = path.join("avatars", filename);
  }
    const verificationCode = randomUUID();
  
    const hashPass = await bcryptjs.hash(password, 10);
  
    const index = email.split("").findIndex((symbol) => symbol === "@");
    const name = email.slice(0, index);
    const newUser = await User.create({
      email,
      password: hashPass,
      avatarURL,
      name,
      verificationCode,
    });
  
    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: emailVerify(verificationCode, `${BASE_URL}`),
    };
    await sendEmail(verifyEmail);
  
    res.status(201).json({
      email: newUser.email,
      avatarURL: newUser.avatarURL,
    });
  };

 const loginController = async (req, res) => {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    if (!user.verify) {
      throw HttpError(401, "Email not verify")
  }
    const isCorrectPass = await bcryptjs.compare(password, user.password);
  
    if (!isCorrectPass) {
      throw HttpError(401, "Email or password is wrong");
    }
  
    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token }, { new: true });
    res.status(200).json({
      message: `Login '${email}' successful`,
      token,
    });
  };

   const logoutController = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json({
      message: "Logout success"
    });
  };
   const verifyEmailController = async (req, res) => {
    const { verificationCode } = req.params;
    const user = await User.findOne({ verificationCode });
    if (!user) {
      throw HttpError(401, "Email not found");
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationCode: "",
    });
    res.status(200).redirect(`${FRONTEND_URL}/singin`);
  };
  
   const resendVerifyEmailController = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email not found");
    }
    if (user.verify) {
      throw HttpError(401, "Email already verify");
    }
    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: emailVerify(user.verificationCode, BASE_URL),
    };
    await sendEmail(verifyEmail);
    res.json({
      message: "Verify email send success",
    });
  };

  export default {
    registerController: ctrlWrapper(registerController),
    loginController: ctrlWrapper(loginController),
    logoutController: ctrlWrapper(logoutController),
    verifyEmailController: ctrlWrapper(verifyEmailController),
    resendVerifyEmailController: ctrlWrapper(resendVerifyEmailController),
  }
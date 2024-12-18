import { Schema, model } from "mongoose";
import { handleSaveError, runValidatorAtUpdate } from "../bd/hooks.js";
import Joi from "joi";

const userSchema = new Schema(
    {
      password: {
        type: String,
        min: 8,
        max: 64,
        required: [true, "Password is required"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
      },
      token: {
        type: String,
        default: null,
      },
      name: {
        type: String,
        default: "",
      },
      avatarURL: {
        type: String,
      },
      verify: {
        type: Boolean,
        default: false,
      },
      verificationCode: {
        type: String,
        default: "",
      },
    },
  
    { versionKey: false, timestamps: true }
  );
  userSchema.post("save", handleSaveError);
  userSchema.pre("findOneAndUpdate", runValidatorAtUpdate);
  userSchema.post("findOneAndUpdate", handleSaveError);
  
  export const User = model("auth", userSchema);
  
  export const registerSchema = Joi.object({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string().min(8).max(64).required(),
  });
  export const emailSchema = Joi.object({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  });
  
  export const passwordSchema = Joi.object({
    password: Joi.string().min(8).max(64).required(),
  });
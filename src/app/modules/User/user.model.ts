import { Schema, model } from "mongoose";
import { userRoleArray } from "./user.constant";
import { TRegisterUser } from "./user.interface";

const userSchema = new Schema<TRegisterUser>({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: userRoleArray,
    default: "User",
  },
});

//
export const UserModel = model<TRegisterUser>("User", userSchema);

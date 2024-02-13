import { Schema, model } from "mongoose";
import { TRegisterUser } from "./user.interface";

const userSchema = new Schema<TRegisterUser>({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

//
export const UserModel = model<TRegisterUser>("User", userSchema);

import { userRole } from "./user.constant";

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  role: "User" | "Manager";
};
export type TLoginUser = {
  email: string;
  password: string;
};

export type TUserRole = keyof typeof userRole;

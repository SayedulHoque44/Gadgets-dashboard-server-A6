import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TLoginUser, TRegisterUser } from "./user.interface";
import { UserModel } from "./user.model";
import { createToken } from "./user.utils";

const registerUserFromDB = async (payload: TRegisterUser) => {
  const email = payload.email.toLowerCase();
  const user = await UserModel.findOne({
    email: email,
  });

  if (user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User Already Exits! please Login!"
    );
  }

  const createUser = await UserModel.create({ ...payload, email });
  return createUser;
};

const logInUserFromDB = async (payload: TLoginUser) => {
  const email = payload.email.toLowerCase();

  const userExits = await UserModel.findOne({ email: email });
  if (!userExits) {
    throw new AppError(httpStatus.NOT_FOUND, "User not exits!");
  }

  const user = await UserModel.findOne({
    email: email,
    password: payload.password,
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User email or password invalid");
  }
  const jwtPayload = {
    userId: user._id.toString(),
    name: user.name,
    role: user.role,
  };
  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return { token };
};

//
export const userServices = {
  registerUserFromDB,
  logInUserFromDB,
};

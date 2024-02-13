import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TLoginUser, TRegisterUser } from "./user.interface";
import { UserModel } from "./user.model";
import { createToken } from "./user.utils";

const registerUserFromDB = async (payload: TRegisterUser) => {
  const user = await UserModel.findOne({
    email: payload.email,
  });

  if (user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User Already Exits! please Login!"
    );
  }

  const createUser = await UserModel.create(payload);
  return createUser;
};

const logInUserFromDB = async (payload: TLoginUser) => {
  const user = await UserModel.findOne({
    email: payload.email,
    password: payload.password,
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User email or password invalid");
  }
  const jwtPayload = {
    userId: user._id.toString(),
    name: user.name,
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

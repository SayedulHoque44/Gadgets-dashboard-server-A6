import { z } from "zod";

const registerUserSchema = z.object({
  body: z.object({
    name: z.string({}),
    email: z.string().email(),
    password: z.string(),
  }),
});
const logInUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const userValidationSchema = {
  registerUserSchema,
  logInUserSchema,
};

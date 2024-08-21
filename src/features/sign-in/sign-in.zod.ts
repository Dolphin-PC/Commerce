import { z } from "zod";
import { email, password } from "../sign-up/sign-up.zod";

export const SignInSchema = z.object({
  email,
  password,
});

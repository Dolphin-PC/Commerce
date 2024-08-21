import { PASSWORD_KEYBOARD_REGEX, PASSWORD_REGEX } from "@/shared/lib/regex";
import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z.string().email({
      message: "이메일 형식이 아닙니다.",
    }),
    nickname: z.string().min(2, {
      message: "닉네임은 2자 이상이어야 합니다.",
    }),

    /**
     * 최소10
     * 소문자+대문자+숫자+특수문자 중 3가지 이상 조합
     * 일련번호, 전화번호 포함 X
     * email, 잘 알려진 단어, 키보드 상에 나란히 있는 문자열 포함 X
     */
    password: z
      .string()
      .min(10, { message: "비밀번호는 최소 10자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 최대 20자 이하여야 합니다." })
      .regex(PASSWORD_REGEX, {
        message:
          "소문자, 대문자, 숫자, 특수문자 즁 3가지 이상 포함해야 합니다.",
      })
      .regex(PASSWORD_KEYBOARD_REGEX, {
        message: "키보드 상에 나란히 있는 문자열을 포함할 수 없습니다.",
      }),

    confirmPassword: z.string(),
  })
  .refine((data) => !data.password.includes(data.email.split("@")[0]), {
    message: "비밀번호에 이메일 아이디를 포함할 수 없습니다.",
    path: ["password"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

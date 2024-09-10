import { z } from "zod";
/** 회원가입 스키마 */
export declare const SignUpSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    email: z.ZodString;
    nickname: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    isSeller: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
    isSeller: boolean;
}, {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
    isSeller: boolean;
}>, {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
    isSeller: boolean;
}, {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
    isSeller: boolean;
}>, {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
    isSeller: boolean;
}, {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
    isSeller: boolean;
}>;
/** 소셜로그인 회원가입 스키마 */
export declare const OAuthSignUpSchema: z.ZodObject<{
    nickname: z.ZodString;
    isSeller: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    nickname: string;
    isSeller: boolean;
}, {
    nickname: string;
    isSeller: boolean;
}>;
/** 로그인 스키마 */
export declare const SignInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;

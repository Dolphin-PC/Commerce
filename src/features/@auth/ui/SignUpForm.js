import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { addNewUser } from "@/features/user/api/post-user";
import Column from "@/shared/components/atoms/Column";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { toast } from "@/shared/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/sign-up";
import { SignUpSchema } from "../model/auth.zod";
import { AuthError } from "@supabase/supabase-js";
import { ROUTES } from "@/shared/consts/route.const";
export const SignUpForm = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
    const form = useForm({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            nickname: "",
            isSeller: false,
        },
    });
    const handleSignup = async (data) => {
        try {
            const auth = await signup({
                email: data.email,
                password: data.password,
            });
            if (auth.user === null)
                throw new Error("회원가입에 실패했습니다.");
            await addNewUser({
                id: auth.user.id,
                email: data.email,
                nickname: data.nickname,
                isseller: data.isSeller,
            });
            toast({
                title: "회원가입이 완료되었습니다.",
                description: "로그인 페이지로 이동합니다.",
            });
            navigate(ROUTES.SIGNIN);
        }
        catch (error) {
            if (error instanceof AuthError) {
                toast({
                    title: "회원가입에 실패했습니다.",
                    description: error.message,
                });
            }
            else {
                toast({
                    title: "회원가입에 실패했습니다.",
                });
                console.error(error);
            }
        }
    };
    return (_jsx(Form, { ...form, children: _jsx("form", { onSubmit: form.handleSubmit(handleSignup), children: _jsxs(Column, { className: "gap-[20px]", children: [_jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Email", ...field, autoComplete: "username" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { children: _jsx(Input, { type: passwordVisible ? "text" : "password", placeholder: "Password", ...field, autoComplete: "new-password" }) }), _jsx("button", { type: "button", onClick: togglePasswordVisibility, children: _jsx("small", { children: passwordVisible ? "Hide" : "Show" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "confirmPassword", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Confirm Password" }), _jsx(FormControl, { children: _jsx(Input, { type: "password", placeholder: "Confirm Password", ...field, autoComplete: "new-password" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "nickname", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Nickname" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Nickname", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "isSeller", render: ({ field }) => (_jsxs(FormItem, { className: "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4", children: [_jsx(FormControl, { children: _jsx(Checkbox, { checked: field.value, onCheckedChange: field.onChange }) }), _jsx(FormLabel, { children: "\uD310\uB9E4\uC790\uB85C \uAC00\uC785\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?" }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", children: "Sign Up" })] }) }) }));
};

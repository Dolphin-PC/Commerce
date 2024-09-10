import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getUserInfo } from "@/features/user/api/get-user";
import { Column } from "@/shared/components/atoms/Column";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { toast } from "@/shared/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInWithPassword } from "../api/sign-in";
import { SignInSchema } from "../model/auth.zod";
import { useAuthStore } from "../store/auth.store";
export const SignInForm = () => {
    const navigate = useNavigate();
    const setSignedIn = useAuthStore((state) => state.setSignedIn);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
    const form = useForm({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const handleSignIn = async (data) => {
        try {
            const user = await signInWithPassword({
                email: data.email,
                password: data.password,
            });
            const userInfo = await getUserInfo({ id: user.id });
            if (userInfo === null)
                throw new Error("사용자를 찾을 수 없습니다.");
            setSignedIn(userInfo);
            toast({
                title: "로그인이 완료되었습니다.",
            });
            navigate("/");
        }
        catch (err) {
            console.error(err);
            toast({
                title: "로그인에 실패했습니다.",
            });
        }
    };
    return (_jsx(Form, { ...form, children: _jsx("form", { onSubmit: form.handleSubmit(handleSignIn), children: _jsxs(Column, { className: "gap-[20px]", children: [_jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Email", ...field, autoComplete: "username" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { children: _jsx(Input, { type: passwordVisible ? "text" : "password", placeholder: "Password", ...field, autoComplete: "current-password" }) }), _jsx("button", { type: "button", onClick: togglePasswordVisibility, children: _jsx("small", { children: passwordVisible ? "Hide" : "Show" }) }), _jsx(FormMessage, { "data-testid": "error-password" })] })) }), _jsx(Button, { type: "submit", children: "Sign In" })] }) }) }));
};

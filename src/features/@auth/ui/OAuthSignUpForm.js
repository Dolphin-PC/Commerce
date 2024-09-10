import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { addNewUser } from "@/features/user/api/post-user";
import Column from "@/shared/components/atoms/Column";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { toast } from "@/shared/components/ui/use-toast";
import { ROUTES } from "@/shared/consts/route.const";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../api/get-user";
import { OAuthSignUpSchema } from "../model/auth.zod";
export const OAuthSignUpForm = () => {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(OAuthSignUpSchema),
        defaultValues: {
            nickname: "",
            isSeller: false,
        },
    });
    const handleSignup = async (data) => {
        const { user } = await getAuthUser();
        if (!user)
            return;
        try {
            await addNewUser({
                id: user.id,
                email: user.email,
                nickname: data.nickname,
                isseller: data.isSeller,
            });
            toast({ title: "회원가입이 완료되었습니다." });
            navigate(ROUTES.HOME);
        }
        catch (err) {
            console.error(err);
            toast({ title: "회원가입에 실패했습니다." });
        }
    };
    return (_jsx(Form, { ...form, children: _jsx("form", { onSubmit: form.handleSubmit(handleSignup), children: _jsxs(Column, { className: "gap-[20px]", children: [_jsx(FormField, { control: form.control, name: "nickname", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Nickname" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Nickname", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "isSeller", render: ({ field }) => (_jsxs(FormItem, { className: "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4", children: [_jsx(FormControl, { children: _jsx(Checkbox, { checked: field.value, onCheckedChange: field.onChange }) }), _jsx(FormLabel, { children: "\uD310\uB9E4\uC790\uB85C \uAC00\uC785\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?" }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", children: "Sign Up" })] }) }) }));
};

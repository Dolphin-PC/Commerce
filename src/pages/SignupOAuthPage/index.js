import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getAuthUser } from "@/features/@auth/api/get-user";
import { OAuthSignUpForm } from "@/features/@auth/ui/OAuthSignUpForm";
import { getUserInfo } from "@/features/user/api/get-user";
import Column from "@/shared/components/atoms/Column";
import CenterLayout from "@/shared/components/templates/CenterLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { toast } from "@/shared/components/ui/use-toast";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
const _SignupOAuthPage = () => {
    const navigate = useNavigate();
    // Auth가 있고, DB에 없는 경우에만 접근 허용
    useLayoutEffect(() => {
        const checkUserForAcceptPage = async () => {
            const { user } = await getAuthUser();
            if (!user) {
                toast({ title: "Auth::사용자 정보가 없습니다." });
                return false;
            }
            const userInfo = await getUserInfo({ id: user.id });
            if (userInfo) {
                toast({ title: "DB::사용자 정보가 이미 있습니다." });
                return false;
            }
            return true;
        };
        checkUserForAcceptPage().then((isAccept) => {
            if (!isAccept)
                navigate("/");
        });
    }, [navigate]);
    return (_jsx(Column, { className: "items-center gap-[10px]", children: _jsxs(Card, { className: "w-[350px] flex flex-col", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "OAuth \uD68C\uC6D0\uAC00\uC785" }) }), _jsx(CardContent, { children: _jsx(OAuthSignUpForm, {}) })] }) }));
};
export default function SignupOAuthPage() {
    return (_jsx(CenterLayout, { children: _jsx(_SignupOAuthPage, {}) }));
}

import { jsx as _jsx } from "react/jsx-runtime";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import Loading from "@/shared/components/molecules/Loading";
import CenterLayout from "@/shared/components/templates/CenterLayout";
import { ROUTES } from "@/shared/consts/route.const";
import { Navigate, Outlet } from "react-router-dom";
export const PrivateRoute = () => {
    const user = useAuthStore((state) => state.user);
    const isLoading = useAuthStore((state) => state.isLoading);
    if (isLoading)
        return (_jsx(CenterLayout, { children: _jsx(Loading, { text: "\uC790\uB3D9 \uB85C\uADF8\uC778 \uC911\uC785\uB2C8\uB2E4." }) }));
    if (user === null)
        return _jsx(Navigate, { to: ROUTES.SIGNIN });
    return _jsx(Outlet, {});
};

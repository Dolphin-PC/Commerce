import { useAuthStore } from "@/features/@auth/store/auth.store";
import Loading from "@/shared/components/molecules/Loading";
import CenterLayout from "@/shared/components/templates/CenterLayout";
import { ROUTES } from "@/shared/consts/route.const";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading)
    return (
      <CenterLayout>
        <Loading text="자동 로그인 중입니다." />
      </CenterLayout>
    );

  if (user === null) return <Navigate to={ROUTES.SIGNIN} />;

  return <Outlet />;
};

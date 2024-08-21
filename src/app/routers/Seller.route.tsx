import { useAuthStore } from "@/features/auth/auth.store";
import { ROUTES } from "@/shared/consts/route.const";
import { Navigate, Outlet } from "react-router-dom";

export const SellerRoute = () => {
  const user = useAuthStore((state) => state.user);

  if (user!.isseller === false) {
    return <Navigate to={ROUTES.HOME} />;
  }
  return <Outlet />;
};

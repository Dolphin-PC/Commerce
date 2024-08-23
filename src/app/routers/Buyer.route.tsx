import { useAuthStore } from "@/features/@auth/store/auth.store";
import { ROUTES } from "@/shared/consts/route.const";
import { Navigate, Outlet } from "react-router-dom";

export const BuyerRoute = () => {
  const user = useAuthStore((state) => state.user);

  if (user!.isseller === false) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return <Outlet />;
};

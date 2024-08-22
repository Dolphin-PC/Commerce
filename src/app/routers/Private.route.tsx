import { useAuthStore } from "@/features/auth/auth.store";
import { ROUTES } from "@/shared/consts/route.const";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) return <div>Loading</div>;

  if (user === null) return <Navigate to={ROUTES.SIGNIN} />;

  return <Outlet />;
};

import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isNeedAuth: boolean;
}

export const PrivateRoute = ({ isNeedAuth }: Props) => {
  if (isNeedAuth) {
    // check if user is authenticated
    // if not, redirect to login page
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

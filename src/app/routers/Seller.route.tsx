import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isSeller: boolean;
}

export const SellerRoute = ({ isSeller }: Props) => {
  if (!isSeller) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

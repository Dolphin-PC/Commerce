import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isBuyer: boolean;
}
export const BuyerRoute = ({ isBuyer }: Props) => {
  if (!isBuyer) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

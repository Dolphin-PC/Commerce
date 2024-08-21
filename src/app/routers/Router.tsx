import { Button } from "@/shared/components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SignInPage } from "@/pages/SignInPage";
import { SignupPage } from "@/pages/SignupPage";
import { BuyerRoute } from "./Buyer.route";
import { PrivateRoute } from "./Private.route";
import { SellerRoute } from "./Seller.route";
import { ROUTES } from "../../shared/consts/route.const";
import HomePage from "@/pages/HomePage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

        <Route element={<PrivateRoute isNeedAuth />}>
          <Route element={<SellerRoute isSeller />}>
            <Route
              path={ROUTES.DASHBOARD}
              element={<Button>Dashboard</Button>}
            />
          </Route>
          <Route element={<BuyerRoute isBuyer />}>
            <Route path={ROUTES.MY} element={<Button>my</Button>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

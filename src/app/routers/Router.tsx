import { Button } from "@/shared/components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SignInPage } from "@/pages/SignInPage";
import { SignupPage } from "@/pages/SignupPage";
import { PrivateRoute } from "./Private.route";
import { ROUTES } from "../../shared/consts/route.const";
import HomePage from "@/pages/HomePage";
import { SellerRoute } from "./Seller.route";
import DashBoardPage from "@/pages/DashBoardPage";
import ProductPage from "@/pages/ProductPage";
import ProductNewPage from "@/pages/ProductNewPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.MY} element={<Button>my</Button>} />

          <Route element={<SellerRoute />}>
            <Route path={ROUTES.DASHBOARD} element={<DashBoardPage />} />
            <Route path={ROUTES.PRODUCTS} element={<ProductPage />} />
            <Route path={ROUTES.PRODUCTS_NEW} element={<ProductNewPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

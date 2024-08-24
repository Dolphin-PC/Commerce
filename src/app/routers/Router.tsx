import DashBoardPage from "@/pages/DashBoardPage";
import HomePage from "@/pages/HomePage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import ProductEditPage from "@/pages/ProductEditPage";
import ProductNewPage from "@/pages/ProductNewPage";
import ProductPage from "@/pages/ProductPage";
import { SignInPage } from "@/pages/SignInPage";
import SignupOAuthPage from "@/pages/SignupOAuthPage";
import { SignupPage } from "@/pages/SignupPage";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/consts/route.const";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootComponent from "../Common/RootComponent";
import { PrivateRoute } from "./Private.route";
import { SellerRoute } from "./Seller.route";

export const Router = () => {
  return (
    <BrowserRouter>
      <RootComponent />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
        <Route path={ROUTES.SIGNUP__OAUTH} element={<SignupOAuthPage />} />

        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.MY} element={<Button>my</Button>} />

          {/* 판매자 전용 */}
          <Route element={<SellerRoute />}>
            <Route path={ROUTES.DASHBOARD} element={<DashBoardPage />} />
            <Route path={ROUTES.DASHBOARD__PRODUCTS} element={<ProductPage />} />
            <Route path={ROUTES.DASHBOARD__PRODUCTS__NEW} element={<ProductNewPage />} />
            <Route path={ROUTES.DASHBOARD__PRODUCTS_ID} element={<ProductDetailPage />} />
            <Route path={ROUTES.DASHBOARD__PRODUCTS__EDIT_ID} element={<ProductEditPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

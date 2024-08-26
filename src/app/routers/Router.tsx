import { CenterLoading } from "@/shared/components/molecules/Loading";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/consts/route.const";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootComponent from "../Common/RootComponent";
import { PrivateRoute } from "./Private.route";
import { SellerRoute } from "./Seller.route";

const HomePage = lazy(() => import("@/pages/HomePage/index"));
const ProductPage = lazy(() => import("@/pages/ProductPage/index"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage/index"));

const SignInPage = lazy(() => import("@/pages/SignInPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const SignupOAuthPage = lazy(() => import("@/pages/SignupOAuthPage"));

// 대시보드
const DashBoardPage = lazy(() => import("@/pages/DashBoardPage"));
const DashboardProductPage = lazy(() => import("@/pages/DashboardProductPage"));
const DashboardProductDetailPage = lazy(() => import("@/pages/DashboardProductDetailPage"));
const ProductNewPage = lazy(() => import("@/pages/ProductNewPage"));
const ProductEditPage = lazy(() => import("@/pages/ProductEditPage"));

export const Router = () => {
  return (
    <BrowserRouter>
      <RootComponent />
      <Suspense fallback={<CenterLoading />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.SIGNUP__OAUTH} element={<SignupOAuthPage />} />

          <Route path={ROUTES.PRODUCTS} element={<ProductPage />} />
          <Route path={ROUTES.PRODUCTS_ID} element={<ProductDetailPage />} />

          <Route element={<PrivateRoute />}>
            <Route path={ROUTES.MY} element={<Button>my</Button>} />

            {/* 판매자 전용 */}
            <Route element={<SellerRoute />}>
              <Route path={ROUTES.DASHBOARD} element={<DashBoardPage />} />
              <Route path={ROUTES.DASHBOARD__PRODUCTS} element={<DashboardProductPage />} />
              <Route path={ROUTES.DASHBOARD__PRODUCTS__NEW} element={<ProductNewPage />} />
              <Route path={ROUTES.DASHBOARD__PRODUCTS_ID} element={<DashboardProductDetailPage />} />
              <Route path={ROUTES.DASHBOARD__PRODUCTS__EDIT_ID} element={<ProductEditPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

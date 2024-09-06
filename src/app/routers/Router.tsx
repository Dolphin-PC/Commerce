import { CenterLoading } from "@/shared/components/molecules/Loading";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/consts/route.const";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootComponent from "../Common/RootComponent";
import { PrivateRoute } from "./Private.route";
import { SellerRoute } from "./Seller.route";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/shared/components/molecules/ErrorFallback";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));

const CartPage = lazy(() => import("@/pages/CartPage"));
const MyPage = lazy(() => import("@/pages/MyPage"));
const MyOrderPage = lazy(() => import("@/pages/MyOrderPage"));
const OrderPage = lazy(() => import("@/pages/OrderPage"));
const OrderRedirectPage = lazy(() => import("@/pages/OrderRedirectPage"));

const SignInPage = lazy(() => import("@/pages/SignInPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const SignupOAuthPage = lazy(() => import("@/pages/SignupOAuthPage/SignupOAuthPage"));

// 대시보드
const DashBoardPage = lazy(() => import("@/pages/DashBoardPage"));
const DashboardProductPage = lazy(() => import("@/pages/DashboardProductPage"));
const DashboardProductDetailPage = lazy(() => import("@/pages/DashboardProductDetailPage"));
const DashboardProductNewPage = lazy(() => import("@/pages/DashboardProductNewPage"));
const ProductEditPage = lazy(() => import("@/pages/ProductEditPage"));

export const Router = () => {
  return (
    <BrowserRouter>
      <RootComponent />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<CenterLoading />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
            <Route path={ROUTES.SIGNUP__OAUTH} element={<SignupOAuthPage />} />

            <Route path={ROUTES.PRODUCTS} element={<ProductPage />} />
            <Route path={ROUTES.PRODUCTS_ID} element={<ProductDetailPage />} />

            <Route element={<PrivateRoute />}>
              <Route path={ROUTES.MY} element={<MyPage />} />
              <Route path={ROUTES.MY__ORDERS} element={<MyOrderPage />} />
              <Route path={ROUTES.CART} element={<CartPage />} />
              <Route path={ROUTES.ORDERS_ID} element={<OrderPage />} />
              <Route path={ROUTES.ORDERS_REDIRECT} element={<OrderRedirectPage />} />

              {/* 판매자 전용 */}
              <Route element={<SellerRoute />}>
                <Route path={ROUTES.DASHBOARD} element={<DashBoardPage />} />
                <Route path={ROUTES.DASHBOARD__PRODUCTS} element={<DashboardProductPage />} />
                <Route path={ROUTES.DASHBOARD__PRODUCTS__NEW} element={<DashboardProductNewPage />} />
                <Route path={ROUTES.DASHBOARD__PRODUCTS_ID} element={<DashboardProductDetailPage />} />
                <Route path={ROUTES.DASHBOARD__PRODUCTS__EDIT_ID} element={<ProductEditPage />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

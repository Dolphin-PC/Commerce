export const ROUTES = {
  // public
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",

  // private
  MY: "/my",

  // seller
  DASHBOARD: "/dashboard",
  DASHBOARD__PRODUCTS: "/dashboard/products",
  DASHBOARD__PRODUCTS_ID: "/dashboard/products/:id",
  DASHBOARD__PRODUCTS__NEW: "/dashboard/products/new",
} as const;

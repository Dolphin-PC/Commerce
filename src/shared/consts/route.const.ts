export const ROUTES = {
  // public
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  SIGNUP__OAUTH: "/sign-up/oauth",

  // private
  MY: "/my",

  // seller
  DASHBOARD: "/dashboard",
  DASHBOARD__PRODUCTS: "/dashboard/products",
  DASHBOARD__PRODUCTS_ID: "/dashboard/products/:id",
  DASHBOARD__PRODUCTS__ID: (id: number) => `/dashboard/products/${id}`,
  DASHBOARD__PRODUCTS__NEW: "/dashboard/products/new",
  DASHBOARD__PRODUCTS__EDIT_ID: "/dashboard/products/edit/:id",
  DASHBOARD__PRODUCTS__EDIT__ID: (id: number) => `/dashboard/products/edit/${id}`,
} as const;

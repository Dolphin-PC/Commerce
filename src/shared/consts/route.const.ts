export const ROUTES = {
  // public
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  SIGNUP__OAUTH: "/sign-up/oauth",

  PRODUCTS: "/products",
  PRODUCTS_ID: "/products/:id",
  PRODUCTS_ID_: (id: number) => `/products/${id}`,

  // private
  MY: "/my",
  CART: "/cart",
  MY__ORDERS: "/my/orders",
  MY__ORDERS_ID: "/my/orders/:id",
  MY__ORDERS_ID_: (id: string) => `/my/orders/${id}`,
  ORDERS_ID: "/orders/:id",
  ORDERS_ID_: (id: string) => `/orders/${id}`,
  ORDERS_REDIRECT: "/orders/redirect",
  ORDERS_REDIRECT_: ({ paymentId, code, message }: { paymentId: string; code?: string; message?: string }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("paymentId", paymentId);
    if (code) searchParams.set("code", code);
    if (message) searchParams.set("message", message);
    return `/orders/redirect?${encodeURI(searchParams.toString())}`;
  },

  // seller
  DASHBOARD: "/dashboard",
  DASHBOARD__PRODUCTS: "/dashboard/products",
  DASHBOARD__PRODUCTS_ID: "/dashboard/products/:id",
  DASHBOARD__PRODUCTS__ID: (id: number) => `/dashboard/products/${id}`,
  DASHBOARD__PRODUCTS__NEW: "/dashboard/products/new",
  DASHBOARD__PRODUCTS__EDIT_ID: "/dashboard/products/edit/:id",
  DASHBOARD__PRODUCTS__EDIT__ID: (id: number) => `/dashboard/products/edit/${id}`,
} as const;

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];

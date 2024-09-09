/**
 * query Key
 */
export const queryKey = {
  infinite: "infinite",
  list: "list",

  user: "user",
  product: "product",
  quantity: "quantity",
  category: "category",
  category_list: "category-list",
  image: "image",

  cart: "cart",
  order: "order",
  order_detail: "order-detail",

  pay_history: "pay-history",
};

const oneMinute = 1000 * 60;
export const staleTime = {
  product: oneMinute * 5,
  cart: oneMinute * 5,
  order_detail: oneMinute * 5,
};

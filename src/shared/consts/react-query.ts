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
};

const oneMinute = 1000 * 60;
export const staleTime = {
  product: oneMinute * 5,
  cart: oneMinute * 5,
};

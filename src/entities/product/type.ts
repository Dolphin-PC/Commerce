export type Product = {
  id: number;
  categoryId: number;
  desc: string;
  discountType: string | null;
  discountValue: number | null;
  isDelete: boolean;
  name: string;
  price: number;
  quantity: number;
  sellerId: number;
  createdAt: string;
  updatedAt: string;
};

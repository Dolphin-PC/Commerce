import { z } from "zod";

export const ProductSchema = z.object({
  categoryName: z.string().min(1, {
    message: "카테고리를 선택해주세요.",
  }),
  name: z.string().min(1, {
    message: "상품 이름을 입력해주세요.",
  }),
  desc: z.string().min(1, {
    message: "상품 설명을 입력해주세요.",
  }),
  price: z.coerce.number().min(1, {
    message: "1원 이상의 상품 가격을 입력해주세요.",
  }),
  quantity: z.coerce.number().min(1, {
    message: "1개 이상의 상품 수량을 입력해주세요.",
  }),
  // discountType: z.string(),
  // discountValue: z.coerce.number(),
  productImages: z.array(z.any(), {
    message: "1개 이상의 상품 이미지를 업로드해주세요.",
  }),
});

export type ProductFormDataType = z.infer<typeof ProductSchema>;

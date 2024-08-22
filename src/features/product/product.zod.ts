import { z } from "zod";

export const ProductSchema = z.object({
  categoryName: z.string().min(1, {
    message: "카테고리를 선택해주세요.",
  }),
  name: z.string({
    message: "상품 이름을 입력해주세요.",
  }),
  desc: z.string({
    message: "상품 설명을 입력해주세요.",
  }),

  price: z.coerce.number({
    message: "상품 가격을 입력해주세요.",
  }),

  // quantity: z.number({
  //   message: "상품 수량을 입력해주세요.",
  // }),

  // discountType: z.string({
  //   message: "할인 타입을 선택해주세요.",
  // }),

  // discountValue: z.number({
  //   message: "할인 가격/퍼센트를 입력해주세요.",
  // }),

  // productImages: z.array(z.any(), {
  //   message: "1개 이상의 상품 이미지를 업로드해주세요.",
  // }),
});

export type ProductFormDataType = z.infer<typeof ProductSchema>;

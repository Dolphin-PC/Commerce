import { ProductSchema } from "./product.zod";
describe("ProductSchema | 성공 케이스", () => {
    it("should validate a valid product form data", () => {
        const validProductFormData = {
            categoryId: 1,
            name: "Product Name",
            desc: "Product Description",
            price: 1000,
            quantity: 10,
            discountType: "COST",
            discountValue: 10,
        };
        const result = ProductSchema.safeParse(validProductFormData);
        expect(result.success).toBe(true);
    });
});
describe("ProductSchema | 실패 케이스", () => {
    it("카테고리 미선택", () => {
        const invalidProductFormData = {
            categoryId: 0,
            name: "Product Name",
            desc: "Product Description",
            price: 1000,
            quantity: 10,
            discountType: "NONE",
            discountValue: 10,
        };
        const result = ProductSchema.safeParse(invalidProductFormData);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe("카테고리를 선택해주세요.");
    });
    it("상품 이름 미입력", () => {
        const invalidProductFormData = {
            categoryId: 1,
            name: "",
            desc: "Product Description",
            price: 1000,
            quantity: 10,
            discountType: "PERCENT",
            discountValue: 10,
        };
        const result = ProductSchema.safeParse(invalidProductFormData);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe("상품 이름을 입력해주세요.");
    });
    it("상품 설명 미작성", () => {
        const invalidProductFormData = {
            categoryId: 1,
            name: "Product Name",
            desc: "",
            price: 1000,
            quantity: 10,
            discountType: "PERCENT",
            discountValue: 10,
        };
        const result = ProductSchema.safeParse(invalidProductFormData);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe("상품 설명을 입력해주세요.");
    });
    it("상품 가격 0원", () => {
        const invalidProductFormData = {
            categoryId: 1,
            name: "Product Name",
            desc: "Product Description",
            price: 0,
            quantity: 10,
            discountType: "PERCENT",
            discountValue: 10,
        };
        const result = ProductSchema.safeParse(invalidProductFormData);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe("1원 이상의 상품 가격을 입력해주세요.");
    });
    it("상품 수량 0개", () => {
        const invalidProductFormData = {
            categoryId: 1,
            name: "Product Name",
            desc: "Product Description",
            price: 1000,
            quantity: 0,
            discountType: "PERCENT",
            discountValue: 10,
        };
        const result = ProductSchema.safeParse(invalidProductFormData);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe("1개 이상의 상품 수량을 입력해주세요.");
    });
});

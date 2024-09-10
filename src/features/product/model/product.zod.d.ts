import { z } from "zod";
export declare const ProductSchema: z.ZodObject<{
    categoryId: z.ZodNumber;
    name: z.ZodString;
    desc: z.ZodString;
    price: z.ZodNumber;
    quantity: z.ZodNumber;
    discountType: z.ZodOptional<z.ZodEnum<["NONE", "PERCENT", "COST"]>>;
    discountValue: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    categoryId: number;
    quantity: number;
    desc: string;
    price: number;
    discountType?: "PERCENT" | "COST" | "NONE" | undefined;
    discountValue?: number | undefined;
}, {
    name: string;
    categoryId: number;
    quantity: number;
    desc: string;
    price: number;
    discountType?: "PERCENT" | "COST" | "NONE" | undefined;
    discountValue?: number | undefined;
}>;
export type ProductFormDataType = z.infer<typeof ProductSchema>;

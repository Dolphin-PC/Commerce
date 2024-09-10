import { Product, ProductInsert } from "../type/type";
/**
 * 제품 등록
 */
type Props = ProductInsert;
type Return = Product;
export declare const addProduct: (insert: Props) => Promise<Return>;
export {};

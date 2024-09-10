import { Tables } from "@/shared/config/@db/database-generated.type";
import { Product, ProductUpdate } from "../type/type";
/**
 * @desc 제품 수정
 */
interface Props {
    id: Tables<"product">["id"];
    update: ProductUpdate;
}
interface Return extends Product {
}
export declare const useProductPut: () => import("@tanstack/react-query").UseMutationResult<Return, Error, Props, unknown>;
export {};

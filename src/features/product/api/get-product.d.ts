import { Product } from "../type/type";
/**
 * 제품 상세 조회
 */
interface Props {
    id: number;
    sellerId?: number;
}
type Return = Product;
export declare const getProduct: ({ id, sellerId }: Props) => Promise<Return>;
export declare const useProductSuspenseQuery: (props: Props) => import("@tanstack/react-query").UseSuspenseQueryResult<{
    categoryId: number;
    createdAt: string;
    desc: string;
    discountType: import("../../../shared/config/@db/database-generated.type").Database["public"]["Enums"]["DISCOUNT_TYPE"] | null;
    discountValue: number | null;
    id: number;
    isDelete: boolean;
    name: string;
    price: number;
    quantity: number;
    sellerId: string | null;
    updatedAt: string;
}, Error>;
export {};

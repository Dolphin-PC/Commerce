import { User } from "@/features/user/model/type";
import { CartProductCategory } from "../type";
/**
 * @desc 장바구니 상품(카테고리) 목록조회
 */
interface Props {
    userId: User["id"];
}
type Return = CartProductCategory[];
export declare const getCartProductCategory: ({ userId }: Props) => Promise<Return>;
interface QueryProps {
    userId?: User["id"];
}
export declare const useCartProductCategoryQuery: (props: QueryProps) => import("@tanstack/react-query").UseQueryResult<Return | undefined, Error>;
export {};

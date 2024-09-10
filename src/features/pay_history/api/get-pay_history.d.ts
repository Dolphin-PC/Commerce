import { PayHistory } from "../type";
interface Props {
    id?: PayHistory["id"];
    orderId?: PayHistory["orderId"];
    paymentId?: PayHistory["paymentId"];
}
interface Return extends PayHistory {
}
/**
 * @desc 결제 내역 단건 조회
 */
export declare const getPayHistory: ({ id, orderId, paymentId }: Props) => Promise<Return>;
export declare const useGetPayHistoryQuery: (props: Props) => import("@tanstack/react-query").UseQueryResult<Return, Error>;
export {};

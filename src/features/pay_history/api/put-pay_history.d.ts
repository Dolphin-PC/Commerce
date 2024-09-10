import { PayHistory, PayHistoryUpdate } from "../type";
interface Props {
    paymentId: PayHistory["paymentId"];
    update: PayHistoryUpdate;
}
interface Return extends PayHistory {
}
export declare const usePutPayHistoryMutation: () => import("@tanstack/react-query").UseMutationResult<Return, Error, Props, unknown>;
export {};

import { User } from "@/features/user/model/type";
interface Props {
    user: User | null;
    isLoading: boolean;
}
interface Actions {
    setSignedIn: (user: User | null) => void;
    getUser: () => User;
}
export declare const useAuthStore: import("zustand").UseBoundStore<import("zustand").StoreApi<Props & Actions>>;
export {};

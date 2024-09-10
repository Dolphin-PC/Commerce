import { Category } from "@/features/category/model/type";
/**
 * @desc 검색어 store
 * - 검색창에서 입력하는 값들은 temp_ 변수에 저장되고,
 * - onSearch함수 실행 시, temp_ 변수들을 실제 변수에 저장 && isEnable = true
 */
interface Store extends Search {
    /** 검색창 값 사용가능 여부 */
    isEnable: boolean;
}
interface Search {
    searchText: string;
    categoryIds: Category["id"][];
    priceRange: number[] | null;
}
interface Actions {
    setSearchText: (text: string) => void;
    setCategoryIds: (ids: Category["id"][]) => void;
    setPriceRange: (range: number[] | null) => void;
    setIsEnable: (isEnable: boolean) => void;
    /** isEnable => 사용가능 */
    getSearch: () => Search | null;
    reset: () => void;
}
export declare const useSearchStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<Store & Actions>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<Store & Actions, Store & Actions>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: Store & Actions) => void) => () => void;
        onFinishHydration: (fn: (state: Store & Actions) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<Store & Actions, Store & Actions>>;
    };
}>;
export {};

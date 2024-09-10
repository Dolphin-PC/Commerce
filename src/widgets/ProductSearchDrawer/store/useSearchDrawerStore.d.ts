import { Category } from "@/features/category/model/type";
/**
 * @desc 상품 필터창 store
 */
interface Store extends Search {
    /** 필터 검색 drawer open */
    isOpen: boolean;
}
interface Search {
    searchText: string;
    categoryIds: Category["id"][];
    priceRange: number[];
}
interface Actions {
    setSearchText: (text: string) => void;
    setCategoryIds: (ids: Category["id"][]) => void;
    setPriceRange: (range: number[]) => void;
    setIsOpen: (isOpen: boolean) => void;
    /** 초기화 */
    reset: () => void;
}
export declare const searchInitialState: Search;
export declare const useSearchDrawerStore: import("zustand").UseBoundStore<import("zustand").StoreApi<Store & Actions>>;
export {};

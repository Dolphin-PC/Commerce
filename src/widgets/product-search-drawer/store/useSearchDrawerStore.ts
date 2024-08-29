import { create } from "zustand";
import { useSearchStore } from "./useSearchStore";
import { Category } from "@/features/category/model/type";

/**
 * @desc 상품 필터창 store
 */
interface Store {
  searchText: string;
  categoryIds: Category["id"][];
  priceRange: number[];

  isOpen: boolean;
}

interface Actions {
  setSearchText: (text: string) => void;
  setCategoryIds: (ids: Category["id"][]) => void;
  setPriceRange: (range: number[]) => void;

  setIsOpen: (isOpen: boolean) => void;

  /** drawerStore에 있는 값을 searchStore에 반영 */
  onSearch: () => void;
  /** searchStore에 있는 값을 drawerStore에 반영 */
  initSearch: () => void;
}

export const useSearchDrawerStore = create<Store & Actions>((set, get) => ({
  searchText: "",
  categoryIds: [],
  priceRange: [0, 50_000],

  isOpen: false,

  setSearchText: (text: string) => set({ searchText: text }),
  setCategoryIds: (ids: Category["id"][]) => set({ categoryIds: ids }),
  setPriceRange: (range: number[]) => set({ priceRange: range }),

  setIsOpen: (isOpen: boolean) => set({ isOpen }),

  onSearch: () => {
    const { setSearchText, setCategoryIds, setPriceRange, setIsEnable } = useSearchStore.getState();
    const { searchText, categoryIds, priceRange } = get();
    setSearchText(searchText);
    setCategoryIds(categoryIds);
    setPriceRange(priceRange);
    setIsEnable(true);
  },

  initSearch: () => {
    const { searchText, categoryIds, priceRange } = useSearchStore.getState();
    const { setSearchText, setCategoryIds, setPriceRange } = get();
    setSearchText(searchText);
    setCategoryIds(categoryIds);
    setPriceRange(priceRange);
  },
}));

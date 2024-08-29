import { create } from "zustand";
import { useSearchStore } from "./useSearchStore";
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
  priceRange: number[] | null;
}

interface Actions {
  setSearchText: (text: string) => void;
  setCategoryIds: (ids: Category["id"][]) => void;
  setPriceRange: (range: number[] | null) => void;

  setIsOpen: (isOpen: boolean) => void;

  /** 초기화 */
  reset: () => void;
}

export const searchInitialState: Search = {
  searchText: "",
  categoryIds: [],
  priceRange: [0, 500_000],
};

export const useSearchDrawerStore = create<Store & Actions>((set, get) => ({
  ...searchInitialState,

  isOpen: false,

  setSearchText: (text) => set({ searchText: text }),
  setCategoryIds: (ids) => set({ categoryIds: ids }),
  setPriceRange: (range) => set({ priceRange: range }),

  setIsOpen: (isOpen) => set({ isOpen }),

  reset: () => {
    set({ ...searchInitialState });
  },
}));

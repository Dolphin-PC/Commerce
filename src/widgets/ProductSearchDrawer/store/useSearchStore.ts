import { Category } from "@/features/category/model/type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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

export const useSearchStore = create(
  persist<Store & Actions>(
    (set, get) => ({
      searchText: "",
      categoryIds: [],
      priceRange: [0, 50_000],

      isEnable: false,

      setSearchText: (text) => set({ searchText: text }),
      setCategoryIds: (ids) => set({ categoryIds: ids }),
      setPriceRange: (range) => set({ priceRange: range }),

      setIsEnable: (isEnable) => set({ isEnable }),

      getSearch: () => {
        if (get().isEnable) {
          const { searchText, categoryIds, priceRange } = get();

          return { searchText, categoryIds, priceRange };
        }
        return null;
      },

      reset: () => {
        set({ isEnable: false });
      },
    }),
    {
      name: "search-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

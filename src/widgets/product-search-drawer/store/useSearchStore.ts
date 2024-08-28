import { Category } from "@/features/category/model/type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * @desc 검색어 store
 */

interface Store {
  searchText: string;
  categoryIds: Category["id"][];
  priceRange: number[];
}

interface Actions {
  setSearchText: (text: string) => void;
  setCategoryIds: (ids: Category["id"][]) => void;
  setPriceRange: (range: number[]) => void;

  getQueryParam: () => string;
}

export const useSearchStore = create(
  persist<Store & Actions>(
    (set, get) => ({
      searchText: "",
      categoryIds: [],
      priceRange: [0, 50_000],
      setSearchText: (text: string) => set({ searchText: text }),
      setCategoryIds: (ids: Category["id"][]) => set({ categoryIds: ids }),
      setPriceRange: (range: number[]) => set({ priceRange: range }),

      getQueryParam: () => {
        const { searchText, categoryIds, priceRange } = get();
        const query = new URLSearchParams();

        if (searchText) {
          query.append("search", searchText);
        }

        if (categoryIds.length) {
          query.append("category", categoryIds.join(","));
        }

        if (priceRange[0] || priceRange[1]) {
          query.append("price", priceRange.join(","));
        }

        return query.toString();
      },
    }),
    {
      name: "search-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
export const useSearchStore = create(persist((set, get) => ({
    searchText: "",
    categoryIds: [],
    priceRange: [0, 50000],
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
}), {
    name: "search-store",
    storage: createJSONStorage(() => localStorage),
}));

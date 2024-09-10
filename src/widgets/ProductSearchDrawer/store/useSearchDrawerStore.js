import { create } from "zustand";
export const searchInitialState = {
    searchText: "",
    categoryIds: [],
    priceRange: [0, 500000],
};
export const useSearchDrawerStore = create((set) => ({
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

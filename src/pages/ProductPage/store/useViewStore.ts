import { create } from "zustand";

interface States {
  orderColumn: "createdAt" | "price";
  viewStyle: "grid" | "list";
}

interface Actions {
  setOrderColumn: (data: "createdAt" | "price") => void;
  setViewStyle: (data: "grid" | "list") => void;
}

export const useViewStore = create<States & Actions>((set) => ({
  orderColumn: "createdAt",
  viewStyle: "grid",

  setOrderColumn: (orderColumn) => set({ orderColumn }),
  setViewStyle: (viewStyle) => set({ viewStyle }),
}));

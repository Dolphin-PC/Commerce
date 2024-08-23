import { User } from "@/features/user/model/type";
import { create } from "zustand";

interface Props {
  user: User | null;
  isLoading: boolean;
}

interface Actions {
  setSignedIn: (user: User | null) => void;
}

export const useAuthStore = create<Props & Actions>((set) => ({
  user: null,
  isLoading: true,
  setSignedIn: (user) => set({ user, isLoading: false }),
}));

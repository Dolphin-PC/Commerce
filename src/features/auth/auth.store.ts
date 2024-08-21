import { User } from "@/entities/user";
import { create } from "zustand";

interface Props {
  user: User | null;
}

interface Actions {
  setSignedIn: (user: User | null) => void;
}

export const useAuthStore = create<Props & Actions>((set) => ({
  user: null,
  setSignedIn: (user) => set({ user }),
}));

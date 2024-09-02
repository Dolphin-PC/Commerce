import { User } from "@/features/user/model/type";
import { create } from "zustand";

interface Props {
  user: User | null;
  isLoading: boolean;
}

interface Actions {
  setSignedIn: (user: User | null) => void;
  getUser: () => User;
}

export const useAuthStore = create<Props & Actions>((set, get) => ({
  user: null,
  isLoading: true,
  setSignedIn: (user) => set({ user, isLoading: false }),
  getUser: () => {
    const user = get().user;
    if (!user) throw new Error("User is not signed in");
    return user;
  },
}));

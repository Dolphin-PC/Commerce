import { create } from "zustand";
export const useAuthStore = create((set, get) => ({
    user: null,
    isLoading: true,
    setSignedIn: (user) => set({ user, isLoading: false }),
    getUser: () => {
        const user = get().user;
        if (!user)
            throw new Error("User is not signed in");
        return user;
    },
}));

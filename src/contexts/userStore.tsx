import { User } from "@/type/User";
import { create } from "zustand";
import {persist} from "zustand/middleware";

interface CurrentUserState {
	currentUser: User | null;
	setCurrentUser: (user: User | null) => void;
    hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
}

export const useCurrentUserStore = create<CurrentUserState>()(
    persist(
        (set) => ({
            currentUser: null,
            hasHydrated: false,
            setCurrentUser: (user) => set({ currentUser: user }),
            setHasHydrated: (state) => set({ hasHydrated: state }),
        }),
        {
            name: 'current-user-store',
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);

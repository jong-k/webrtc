import { create, StateCreator } from "zustand";

interface HostState {
  identity: string;
  isRoomHost: boolean;
  setIsRoomHost: (isRoomHost: boolean) => void;
}

const hostStore: StateCreator<HostState> = (set) => ({
  identity: "",
  isRoomHost: false,
  setIsRoomHost: (isRoomHost: boolean) => set({ isRoomHost }),
});

export const useHostStore = create<HostState>()(hostStore);

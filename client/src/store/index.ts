import { create, StateCreator } from "zustand";

interface HostState {
  identity: string;
  isRoomHost: boolean;
  setIsRoomHost: (isRoomHost: boolean) => void;
}

interface ConnectState {
  connectOnlyWithAudio: boolean;
}

// host state
const hostStore: StateCreator<HostState> = (set) => ({
  identity: "",
  isRoomHost: false,
  setIsRoomHost: (isRoomHost: boolean) => set({ isRoomHost }),
});

export const useHostStore = create<HostState>()(hostStore);

// connect state
const connectStore: StateCreator<ConnectState> = (set) => ({
  connectOnlyWithAudio: false,
  setConnectOnlyWithAudio: (connectOnlyWithAudio: boolean) =>
    set({ connectOnlyWithAudio }),
});

export const useConnectStore = create<ConnectState>()(connectStore);

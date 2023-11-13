import { create } from 'zustand'

type Store = {
    side: string;
    setSide: (newSide: string) => void;
}

export const useStore = create<Store>((set) => ({
  side: 'home',
  setSide: (newSide) => set(() => ({ side: newSide })),
}));
import { create } from 'zustand'

type Store = {
    side: string;
    setSide: (newSide: string) => void;
    short: boolean;
    setShort: (newSide: boolean) => void
    search: boolean;
    setSearch: (newSide: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  side: 'home',
  setSide: (newSide) => set(() => ({ side: newSide })),
  short: false,
  setShort: (newShort) => set(() => ({ short: newShort })),
  search: false,
  setSearch: (newSearch) => set(() => ({ search: newSearch }))
}));
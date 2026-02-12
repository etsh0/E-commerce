import { create } from 'zustand'

export const useDrawerStore = create((set) => ({
    isMenuOpen: false,

    openMenu: () => set({isMenuOpen:true}),
    closeMenu: () => set({isMenuOpen:false})
}))
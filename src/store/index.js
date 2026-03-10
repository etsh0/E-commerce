import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const domain = "http://localhost:1337"

export const useDrawerStore = create((set) => ({
    isMenuOpen: false, // menuBar
    isSideFiltersOpen: false, // sideFilters
    isSideCartOpen:false, // sideCart
    isSideAccountOpen:false, // sideAccount


    // menuBar functions
    openMenu: () => set({isMenuOpen:true}),
    closeMenu: () => set({isMenuOpen:false}),

    // sideFilters functions
    openSideFilters: () => set({isSideFiltersOpen:true}),
    closeSideFilters: () => set({isSideFiltersOpen:false}),

    // sideCart
    openSideCart: () => set({isSideCartOpen:true}),
    CloseSideCart: () => set({isSideCartOpen:false}),

    //sideAccount
    openSideAccount: () => set({isSideAccountOpen:true}),
    closeSideAccount: () => set({isSideAccountOpen:false}),
}))


export const useAuthStore = create(persist(
    (set) => ({

    user: null,
    token: null,
    isAuthenticated: false,

    login: (userData, jwt) => set({
        user: userData,
        token: jwt,
        isAuthenticated : true
    }),

    logout:  () => {
        set({user: null , token: null , isAuthenticated : false});
        localStorage.removeItem('auth-storage');
}
    
}),
{
    name: 'auth-storage'
}
));

export const useAuthAdmin = create(persist(
    (set) => ({
        admin: null,
        adminToken: null,
        AdminIsAuthenticated: false,

        adminLogin: (adminData , jwt) => set({
            admin: adminData,
            adminToken: jwt,
            AdminIsAuthenticated : true
        }),

        adminLogout: () => set({
            admin: null,
            adminToken: null,
            AdminIsAuthenticated: false
        })
    }),
    {
        name: "admin-storage"
    }
))

// filtering store 
export const useFilterStore = create((set) => ({
    page: 1 ,
    setPage : (newValue) => set({page: newValue}),

    selectedCategories : [], 
    setSelectedCategories : (slug) => set((state) => ({
        selectedCategories : state.selectedCategories.includes(slug) ? state.selectedCategories.filter( s => s !== slug ) : [...state.selectedCategories, slug],
        page : 1
    }))
}))
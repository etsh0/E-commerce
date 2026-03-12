import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const domain = "http://localhost:1337"

export const useDrawerStore = create((set) => ({
    isMenuOpen: false, // menuBar
    isSideFiltersOpen: false, // sideFilters
    isSideCartOpen:false, // sideCart
    isSideAccountOpen:false, // sideAccount
    isProductModalOpen:false,
    selectedProduct: null,


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

    //ProductModal
    openProductModal: (product) => set({isProductModalOpen:true, selectedProduct: product}),
    closeProductModal: () => set({isProductModalOpen:false})
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

    // filter by category
    selectedCategories : [], 
    setSelectedCategories : (slug) => set((state) => ({
        selectedCategories : state.selectedCategories.includes(slug) ? state.selectedCategories.filter( s => s !== slug ) : [...state.selectedCategories, slug],
        page : 1
    })),

    // filter by colors 
    selectedColors:[] ,
    setSelectedColors: (slug) => set((state) => ({
        selectedColors: state.selectedColors.includes(slug) ? state.selectedColors.filter(c => c !== slug) : [...state.selectedColors, slug],
        page: 1
    })),

    
    // filter by size 
    selectedSizes : [],
    setSelectedSizes : (slug) => set((state) => ({
        selectedSizes : state.selectedSizes.includes(slug) ? state.selectedSizes.filter(s => s !== slug) : [...state.selectedSizes ,slug],
    })),
    
    // selected color in product page 
    productColor : null,
    setProductColor : (slug) => set({productColor :(slug)}),

    // selected size in product page
    productSize : null,
    setProductSize : (slug) => set({productSize :(slug)}),

    // reset product selection
    resetProductSelection: () => set({ productColor: null, productSize: null }),

    // filter by priceRange 
    priceRange:[600,3000],
    setPriceRange: (newValue) => set({priceRange: newValue}),

    // sorting 
    sortBy : 'createdAt:desc', // من الاحدث ل الاقدم
    setSortBy : (newValue) => set({sortBy : newValue , page : 1}), 


    // resetAllFilter, sorting , pagination
    resetFilters : () => set({
        page: 1,
        selectedCategories : [],
        selectedColors : [],
        selectedSizes : [],
        priceRange:[600,3000],
        sortBy : 'createdAt:desc',
    })
}))

// add to cart store 
export const useCartStore = create((set) => ({
    cart: [],
    setCart: (product) => set( () => ({cart: product})) 
}))
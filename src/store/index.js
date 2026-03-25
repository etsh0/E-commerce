import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const domain = "http://localhost:1337"

// user blocked status
axios.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {

      localStorage.removeItem("auth-storage"); 
      
      sessionStorage.setItem("was_blocked", "true");
      
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);


// fetch categories function 
export const useCategoriesStore = create( (set) => ({
    categories:[],
    fetchCategories: async (searchquery = '') => {
        let url = domain + '/api/categories'
        try {
            const res = await axios.get(url, {
                params: {
                    populate: '*',
                    filters: {
                        name:{
                            $containsi: searchquery
                        }
                    }
                }
            })
            set({categories: res.data.data})
        } catch (error) {
            console.log(error);
            
        }
    },
    addCategory: async (newCategory) => {
        let url = domain + '/api/categories'
        try {
            const res = await axios.post(url , {
                data: newCategory
            })
            set((state) => ({categories: [...state.categories, res.data.data]}))
            toast.success("Category added successfully")            
        } catch (error) {
            console.log(error.message);  
        }
    },
    deleteCategory: async (categoryID) => {
        let url = domain + `/api/categories/${categoryID}`
        try {
            const res = await axios.delete(url)
            set( (state) => ({categories: state.categories.filter( cat => cat.documentId !== categoryID )}) )
            toast.success("Category deleted successfully")
        } catch (error) {
            console.log(error);
        }
    },
    upadteCategory: async (categoryId, updateCategory) => {
        let url = domain + `/api/categories/${categoryId}`
        try {
            const res = await axios.put(url, {data: updateCategory})
            set( (state) => ({categories: state.categories.map( (cat) => cat.documentId === categoryId ? res.data.data : cat)}))
            toast.success("Category Updated successfully")
        } catch (error) {
            console.log(error);
        }
    }
}))

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

    setUpdateUser: (newData) => set({
        user: newData
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
    color_hex_code:null,
    setProductColor : (slug, hex_code) => set({productColor :(slug), color_hex_code:(hex_code)}),

    // selected size in product page
    productSize : null,
    setProductSize : (slug) => set({productSize :(slug)}),

    // reset product selection
    resetProductSelection: () => set({ productColor: null, productSize: null, color_hex_code: null }),

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
export const useCartStore = create(persist((set, get) => ({
    cart: [],

    setAddToCart: (product, selectedSize, selectedColor, qty) => set((state) => {
        const isExistingItem = state.cart.findIndex( item => 
            item.id === product.id && 
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize )

        if(isExistingItem !== -1) {
            const updateCart = [...state.cart]
            updateCart[isExistingItem].qty += qty
            return {cart : updateCart}
        }else {
            return {cart: [...state.cart, {...product, selectedSize, selectedColor,qty }]}
        }
    }), 

    setUpdateCart: (id , size , color, newQty) => set( (state) => ({
        cart: state.cart.map( 
            (item) => (item.id === id && item.selectedSize === size && item.selectedColor === color) ? 
            {...item, qty: Math.max(1,newQty)} : item)
    })),

    removeCartItem: (id,size,color) => set((state) => ({
        cart: state.cart.filter( (item) => !(item.id === id && item.selectedSize === size && item.selectedColor === color))
    })),

    clearCart: () => set({cart:[]}),

    // total orders 
    getSubTotal: () => {
        const cart = get().cart;
        return cart.reduce((acc, el) => acc + (el.qty * el.price), 0);
    },

    shippingPrice: 90,
}),
    {
        name: "Cart"
    }
))

// add to wishlist 
export const useWishlistStore = create(
  persist(
    (set) => ({
      wishList: [], 
      setAddToWishList: (product) => set((state) => {
        const isExisting = state.wishList?.some((item) => item.id === product.id);

        if (!isExisting) {
          toast.success("Adding to wishlist...")
          return { wishList: [...state.wishList, product] };
        } else {
            toast.error("Removed from wishlist") 
          return {wishList: state.wishList.filter( (item) => item.id !== product.id )}
        }
      }),
      removeWishListItem: (product) => set((state) => ({
        wishList: state.wishList.filter( (item) => item.id !== product.id)
      })),

      clearWishList: () => set({wishList:[]}),
    }), 
    { name: "WishList" } 
  ) 
); 

// counter reviews
export const useReviewsCounter = create( persist( (set) => ({
    reviewsCount: 0,
    setReviewsCount: (count) => set({reviewsCount: count})
}),
    {
        name: 'Reviews-Conuter'
    }
))

// orders store 
export const useOrderStore = create( (set) => ({
    userOrders:[],
    allOrders:[],
    fetchUserOrders: async (userId, token) => {
        try {
            let url = domain + '/api/orders'
            const res = await axios.get(url, {
                params: {
                    filters : {
                        user_id : {
                            $eq : userId
                        }
                    }
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            set({userOrders: res.data.data})
        } catch (error) {
            console.log(error); 
        }
    },
    fetchAllOrders: async (token, searchQuery,filterStatus) => {
        try {
            let url = domain + '/api/orders'
            const queryFilters = {
            $or: [
                { firstName: { $containsi: searchQuery } },
                { lastName: { $containsi: searchQuery } },
                { phone: { $containsi: searchQuery } },
                {id: {$containsi: searchQuery}},
            ],
            };

            if (filterStatus !== "all") {
            queryFilters.order_status = {
                $eq: filterStatus
            };
            }
            
            const res = await axios.get(url, {
                params: {
                    populate: '*',
                    filters: queryFilters,
                    sort: 'createdAt:desc',
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })                        
            set({allOrders: res.data.data})
            
        } catch (error) {
            console.log(error); 
        }
    },
    changeStatusOrder: async (token,orderId,newOrderStatus) => {
        let url = domain + `/api/orders/${orderId}`
        
        try {
            const res = await axios.put(url, {
                data:{order_status: newOrderStatus}
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )

        set((state) => ({
            allOrders: state.allOrders.map((order) => order.documentId === orderId ? { ...order, order_status: newOrderStatus } : order)
        }));
            toast.success("Status updated successfully!");
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to update status");
        }
    },
    deleteOrder: async (token,orderId) => {
        let url = domain + `/api/orders/${orderId}`
        try {
            const res = await axios.delete(url,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            set((state) => ({
                allOrders: state.allOrders.filter( o => o.documentId !== orderId)
            }))            
            toast.success("Order deleted successfully!");
        } catch (error) {
            console.log(error);
        }
    }
}))
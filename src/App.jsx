import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminLayout } from './admin/layouts/AdminLayout'
import { ShopLayout } from './website/layouts/ShopLayout'
import { Home } from './website/pages/Home'
import { Shop } from './website/pages/Shop'
import { ProductDetails } from './website/pages/ProductDetails'
import { Details } from './components/Details'
import { Reviews } from './components/Reviews'
import { CartPage } from './website/pages/CartPage'
import { CheckoutPage } from './website/pages/CheckoutPage'
import { AccountLayout } from './website/layouts/AccountLayout'
import { AccountOrders } from './website/pages/AccountOrders'
import { AccountWishlist } from './website/pages/AccountWishlist'
import { AccountPassword } from './website/pages/AccountPassword'
import { AccountDetails } from './website/pages/AccountDetails'
import { Login } from './website/pages/AuthPages/Login'
import { Register } from './website/pages/AuthPages/Register'
import { Dashboard } from './admin/pages/Dashboard';
import { Products } from './admin/pages/Products';
import { Orders } from './admin/pages/Orders';
import { Customers } from './admin/pages/Customers';
import { AdminReviews } from './admin/pages/AdminReviews'
import { LoginPage } from './admin/pages/LoginPage'
import { Categories } from './admin/pages/Categories'
import { AddProduct } from './admin/pages/AddProduct'
import { OrderSuccess } from './website/pages/OrderSuccess'
import { OrderFailed } from './website/pages/OrderFailed'
import { domain, useAuthAdmin, useAuthStore, useCategoriesStore, useCutomersStore, useOrderStore, useUiStore } from './store'
import { useEffect } from 'react'
import axios from 'axios'
import { About } from './website/pages/About'
import { Contact } from './website/pages/Contact'
import { GlobalLoader } from './components/GlobalLoader'
import { Toaster } from 'sonner'


export const App = () => {
	const {adminToken} = useAuthAdmin()
	const {fetchCategories} = useCategoriesStore()
	const {fetchAllUsers} = useCutomersStore()
	const {fetchAllOrders} = useOrderStore()
	const {user, token, setUpdateUser} = useAuthStore()
	const{isAppLoading, setLoading} = useUiStore()
	
	useEffect( () => {
		const startAppLoading = () => { 
			try {
				fetchCategories() 
				setTimeout( () => {
					setLoading("isAppLoading", false)
				} ,1500)
			} catch (error) {
				setLoading("isAppLoading", false)
				console.log(error);
			}
		}
		startAppLoading()
    } ,[])

	// dashboard data fetch
	useEffect( () => {
		if(adminToken) { 
			fetchAllUsers(adminToken, "")
			fetchAllOrders(adminToken, "" , "all")
		}
	} ,[adminToken])

	// Email Sync
	useEffect( () => {

			if(token) {
				const syncData = async () => {
				let url = domain + '/api/users/me'
				try {
					const res = await axios.get(url , {
						headers: {
							Authorization: `Bearer ${token}`
						}
					})

					if(res.data.email !== user?.email || res.data.username !== user?.email) {
						setUpdateUser(res.data)
					}
					
				} catch (error) {
					console.log(error);
				}
			}
			syncData()
		}
	} ,[token])

  return (
	<>
		{
			isAppLoading && (
				<div className='fixed inset-0 bg-white z-9999 flex flex-col items-center justify-center'>
					<GlobalLoader />
				</div>
			)
		}
		{/* i will use framer motion here*/}
		<div className={`w-full h-dvh ${isAppLoading ? "hidden" : "block"}`}> 
			{/* sonner library */}
			<Toaster richColors position="top-left" />
			<BrowserRouter>
				<Routes>
					// website layouts
					<Route path='/' element={<ShopLayout />}> 
						<Route index element={<Home />} />
						<Route path='shop'>
							<Route index element={<Shop />}/>
							<Route path='product-details/:productId' element={<ProductDetails />}>
								<Route index element={<Details />}/>
								<Route path='reviews' element={<Reviews />}/>
							</Route>
						</Route>
						<Route path='about' element={<About />} /> 
						<Route path='contact' element={<Contact />} />
						<Route path='cart' element={<CartPage />} />
						<Route path='account' element={<AccountLayout />}>
							<Route index element={<AccountOrders />} />
							<Route path='wishlist' element={<AccountWishlist />} />
							<Route path='password' element={<AccountPassword />} />
							<Route path='account-details' element={<AccountDetails />} />
						</Route>

						// login and register page
						<Route path='login' element={<Login />} />
						<Route path='register' element={<Register />} />
					</Route>

					// checkout Page
					<Route path='checkout' element={<CheckoutPage />} />
					<Route path='order-success' element={<OrderSuccess />} />
					<Route path='order-faild' element={<OrderFailed />} />

					// admin login page
					<Route path='/admin/login' element={<LoginPage />} />
					
					// dashboard layouts 
					<Route path='/admin' element={<AdminLayout />}>
						<Route index element={<Dashboard />} />
						<Route path='categories' element={<Categories />} />
						<Route path='products' element={<Products />} />
						<Route path='products/add-product' element={<AddProduct />} />
						<Route path='orders' element={<Orders />} />
						<Route path='customers' element={<Customers />} />
						<Route path='reviews' element={<AdminReviews />} />
					</Route>

					// error page
					<Route path='*' element={<h1>Error 404</h1>} /> 

				</Routes>
			</BrowserRouter>
		</div>
	</>
  )
}

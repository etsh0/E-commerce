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
import { AccountAddress } from './website/pages/AccountAddress'
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


export const App = () => {
  return (
	<>
		<div className='w-full h-dvh'>
			<BrowserRouter>
				<Routes>
					// website layouts
					<Route path='/' element={<ShopLayout />}> 
						<Route index element={<Home />} />
						<Route path='shop'>
							<Route index element={<Shop />}/>
							<Route path=':slug' element={<ProductDetails />}>
								<Route index element={<Details />}/>
								<Route path='reviews' element={<Reviews />}/>
							</Route>
						</Route>
						<Route path='about' element={<h1>About page</h1>} />
						<Route path='contact' element={<h1>Contact page</h1>} />
						<Route path='cart' element={<CartPage />} />
						<Route path='checkout' element={<CheckoutPage />} />
						<Route path='account' element={<AccountLayout />}>
							<Route index element={<AccountOrders />} />
							<Route path='wishlist' element={<AccountWishlist />} />
							<Route path='address' element={<AccountAddress />} />
							<Route path='password' element={<AccountPassword />} />
							<Route path='account-details' element={<AccountDetails />} />
						</Route>

						// login and register page
						<Route path='login' element={<Login />} />
						<Route path='register' element={<Register />} />
					</Route>

					// admin login page
					<Route path='/admin/login' element={<LoginPage />} />
					
					// dashboard layouts 
					<Route path='/admin' element={<AdminLayout />}>
						<Route index element={<Dashboard />} />
						<Route path='categories' element={<Categories />} />
						<Route path='products' element={<Products />} />
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

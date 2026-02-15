import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminLayout } from './admin/layouts/AdminLayout'
import { ShopLayout } from './website/layouts/ShopLayout'
import { Home } from './website/pages/Home'
import { Shop } from './website/pages/Shop'
import { ProductDetails } from './website/pages/ProductDetails'
import { Details } from './components/Details'
import { Reviews } from './components/Reviews'

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
						<Route path='cart' element={<h1>Cart page</h1>} />
						<Route path='checkout' element={<h1>Checkout page</h1>} />
						<Route path='account' element={<h1>My Account page</h1>} />

						// login and register page
						<Route path='login' element={<h1>Login page</h1>} />
						<Route path='register' element={<h1>Register page</h1>} />
					</Route>

					// admin login page
					<Route path='/admin/login' element={<h1>Admin Login page</h1>} />
					
					// dashboard layouts 
					<Route path='/admin' element={<AdminLayout />}>
						<Route index element={<h1>Dashboard</h1>} />
						<Route path='products' element={<h1>Products page</h1>} />
						<Route path='orders' element={<h1>Orders page</h1>} />
						<Route path='customers' element={<h1>Customers page</h1>} />
						<Route path='reviews' element={<h1>Reviews page</h1>} />
						<Route path='settings' element={<h1>Settings page</h1>} />
					</Route>

					// error page
					<Route path='*' element={<h1>Error 404</h1>} /> 
				</Routes>
			</BrowserRouter>
		</div>
	</>
  )
}

import { Outlet } from 'react-router-dom'
import { NotificationBar } from '../components/Header/NotificationBar'
import { NavBar } from '../components/Header/NavBar'
import { Footer } from '../components/Footer'
import { SideCart } from '../components/SideCart'

export const ShopLayout = () => {
  return (
    <>
        <div className='min-h-screen flex flex-col'>
            <NotificationBar />
            <NavBar />
            <SideCart />
            <main className='grow'>
                <Outlet />
            </main>
            <Footer />
        </div>
    </>
  )
}

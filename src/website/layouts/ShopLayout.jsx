import { Outlet, useLocation } from 'react-router-dom'
import { NotificationBar } from '../components/Header/NotificationBar'
import { NavBar } from '../components/Header/NavBar'
import { Footer } from '../components/Footer'
import { SideCart } from '../components/SideCart'
import { ProductModal } from '../components/shop/ProductModal'
import { useDrawerStore } from '../../store'
import { useEffect } from 'react'

export const ShopLayout = () => {
  const location = useLocation();
    const {isProductModalOpen, closeProductModal} = useDrawerStore()
    useEffect(() => {
      closeProductModal();
  }, [location.pathname, closeProductModal]);
  return (
    <>
        <div className='min-h-screen flex flex-col'>
            <NotificationBar />
            <NavBar />
            <SideCart />
            <main className='grow'>
                <Outlet />
            </main>
            <div className={`overlay fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isProductModalOpen ? "opacity-100 visible backdrop-blur-xs" : "opacity-0 invisible"}`} onClick={closeProductModal}></div>
            <div className={`product-modal px-10 pt-10 py-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-999 shadow-2xl w-full sm:w-fit h-fit max-h-137.5 overflow-y-auto transition-all duration-500 ease-in-out ${isProductModalOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}>
              <ProductModal />
            </div>
            <Footer />
        </div>
    </>
  )
}

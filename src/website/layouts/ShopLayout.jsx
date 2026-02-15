import { Outlet } from 'react-router-dom'
import { NotificationBar } from '../components/Header/NotificationBar'
import { NavBar } from '../components/Header/NavBar'
// import { PageHeader } from '../components/Header/PageHeader'
import { Footer } from '../components/Footer'

export const ShopLayout = () => {
  return (
    <>
        <div className='min-h-screen flex flex-col'>
            <NotificationBar />
            <NavBar />
            {/* <PageHeader /> */}
            <main className='grow'>
                <Outlet />
            </main>
            <Footer />
        </div>
    </>
  )
}

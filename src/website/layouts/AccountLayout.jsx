import { Link, NavLink, Outlet } from 'react-router-dom'
import { SideAccount } from '../components/SideAccount'


export const AccountLayout = () => {

  return (
    <>
        <div className='flex items-start gap-10 container mt-10'>
          <div className='w-55 md:border-r-2 py-3 px-2 md:pr-10 border-border hidden md:block'>
            <SideAccount />
          </div>
          <div className='grow overflow-auto lg:pr-20'>
            <Outlet />
          </div>
        </div>
    </>
  )
}

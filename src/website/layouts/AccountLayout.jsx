import { Outlet, useNavigate } from 'react-router-dom'
import { SideAccount } from '../components/SideAccount'
import { useEffect } from 'react'
import { useAuthStore, useUiStore } from '../../store'


export const AccountLayout = () => {

  const navigate = useNavigate()
  const {setLoading} = useUiStore() 
  const {token} = useAuthStore()

  useEffect( () => {
      const timer = setTimeout(() => {
          setLoading("isAppLoading", false);
      }, 800); 
      return () => clearTimeout(timer);
  } ,[])

  useEffect( () => {
    if(!token) {
      navigate("/login")
    }
  } ,[token])

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

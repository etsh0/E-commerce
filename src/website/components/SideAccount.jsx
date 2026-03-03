import { Link, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import CartIcon from "../../assets/Cart.svg"
import UserIcon from "../../assets/User.svg"
import AddressIcon from "../../assets/Delivery.svg"
import WishlistIcon from "../../assets/Heart.svg"
import LockIcon from "../../assets/Key.svg"
import Logout from "../../assets/Logout.svg"
import { useAuthStore, useDrawerStore } from '../../store';


export const SideAccount = () => {
    const navLinks = [
    { name: 'Orders', path: '/account', end: true, icon: CartIcon },
    { name: 'Wishlist', path: '/account/wishlist', icon: WishlistIcon },
    { name: 'Address', path: '/account/address', icon: AddressIcon },
    { name: 'Password', path: '/account/password', icon: LockIcon },
    { name: 'Account Details', path: '/account/account-details', icon: UserIcon }, 
    ];

    const {closeSideAccount} = useDrawerStore()
    const {logout} = useAuthStore()
    const navigate = useNavigate()

    const handleLogOut = () => {
        logout()
        navigate("/login")
    }


  return (
    <>
        <div className='side-account flex flex-col gap-4'>
            {
            navLinks.map( (link,idx) => (
                <NavLink key={idx} end to={link.path} onClick={closeSideAccount} className={({isActive}) => `flex items-center gap-4  py-2 pl-6 rounded-lg hover:bg-secondary transition-colors duration-300 ${isActive && "bg-secondary"}`}>
                <img src={link.icon} alt="" />
                <span className='text-sm font-medium text-primary'>{link.name}</span>
                </NavLink>
            ))
            }
            <Link onClick={handleLogOut} className='logout flex items-center gap-4 py-2 pl-6'>
                <img src={Logout} alt="" />
                <span className='text-sm font-medium text-primary'>Logout</span>
            </Link>
        </div>    
    </>
  )
}

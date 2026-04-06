import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../../assets/logo.svg'
import Cart from '../../../assets/Cart.svg'
import User from '../../../assets/User.svg'
import Menu from '../../../assets/Menu.svg'
import { MenuBar } from './MenuBar';
import { useCartStore, useDrawerStore, useUiStore } from '../../../store'
import { SearchBar } from './SearchBar'



export const NavBar = () => {

    const openMenu = useDrawerStore((state) => state.openMenu)
    const navigate = useNavigate()
    const location = useLocation()
    const {setLoading} = useUiStore()
    const {cart} = useCartStore()

    const {openSideCart} = useDrawerStore()

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ]

    const handleAccountClick = () => {
        if (location.pathname === '/account') return;
        setLoading("isAppLoading", true); 
        navigate('/account');
    };

  return (
    <>
        <div className='w-full container py-5 bg-white flex items-center justify-between'>
            <img src={Logo} alt="" />
            <div className="links items-center gap-8 text-sm text-text font-medium hidden lg:flex">
                {
                    navLinks.map( (link,idx) => (
                        <NavLink to={link.path} key={idx} className={({ isActive }) => isActive ? "text-primary" : ""}>
                            {link.name}
                        </NavLink>
                    ))
                }
            </div>  
            <MenuBar />
            <div className='lg:hidden block cursor-pointer' onClick={openMenu}>
                <img src={Menu} alt="" />
            </div>
            <div className='hidden lg:flex'>
                <SearchBar />
                <div className="icons flex items-center gap-8 ml-8 cursor-pointer">
                    <button className='relative cursor-pointer' onClick={openSideCart}>
                        <Link ><img src={Cart} alt="" /></Link>
                        <span className='w-4 h-4 rounded-full bg-primary absolute -top-1 -right-2 text-white text-[10px] font-bold flex items-center justify-center'>{cart?.length}</span>
                    </button>
                    <button onClick={handleAccountClick} className='cursor-pointer'><img src={User} alt="" /></button>
                </div>
            </div>
        </div>
    </>
  )
}

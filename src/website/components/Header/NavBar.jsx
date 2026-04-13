import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../../assets/logo.svg'
import Cart from '../../../assets/Cart.svg'
import User from '../../../assets/User.svg'
import Menu from '../../../assets/Menu.svg'
import { MenuBar } from './MenuBar';
import { useAuthStore, useCartStore, useDrawerStore } from '../../../store'
import { SearchBar } from './SearchBar'



export const NavBar = () => {

    const openMenu = useDrawerStore((state) => state.openMenu)
    const navigate = useNavigate()
    const location = useLocation()
    // const {setLoading} = useUiStore()
    const {cart} = useCartStore()
    const {token} = useAuthStore()

    const {openSideCart,closeSideFilters} = useDrawerStore()

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ]

    const handleAccountClick = () => {
        if (location.pathname.startsWith('/account')) return;

        if (!token) {          
            navigate('/login');
            return;
        }
        
        // setLoading("isAppLoading", true); 
        navigate('/account');
    };

  return (
    <>
        <div className='w-full px-8 py-5 bg-white flex items-center justify-between sticky top-0 z-50 border-b border-border'>
            <img src={Logo} alt="" />
            <div className="links items-center gap-8 text-sm uppercase tracking-wide text-text font-medium hidden lg:flex">
                {
                    navLinks.map( (link,idx) => (
                        <NavLink to={link.path} key={idx} className={({ isActive }) => `relative group py-1 ${isActive ? "text-primary" : "text-text"}`}>
                            {link.name}
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </NavLink>
                    ))
                }
            </div>  
            <MenuBar />
            <div className='lg:hidden block cursor-pointer' onClick={() => { 
                    openMenu(); 
                    closeSideFilters()
            }}>
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

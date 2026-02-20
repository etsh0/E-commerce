import { Link, NavLink } from 'react-router-dom'
import Logo from '../../../assets/logo.svg'
import Search from '../../../assets/Search.svg'
import Cart from '../../../assets/Cart.svg'
import User from '../../../assets/User.svg'
import Menu from '../../../assets/Menu.svg'
import img from '../../../assets/T-Shirt.svg'
import { MenuBar } from './MenuBar';
import { useDrawerStore } from '../../../store'



export const NavBar = () => {

    const openMenu = useDrawerStore((state) => state.openMenu)

    const {openSideCart} = useDrawerStore()

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ]
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
                <div className="search-bar relative ">
                    <input type='text' placeholder='Search Products' className=' w-66 pl-11.75 input' />
                    <img src={Search} alt="" className='absolute top-[50%] translate-y-[-50%] left-4' />
                    {/* drop down */}
                    <div className='absolute top-[calc(100%+8px)] bg-white left-0 w-87 border border-gray-100 rounded-lg shadow-xl z-999 overflow-hidden hidden'>
                        <div className='products-container max-h-100 overflow-y-auto'>
                            {/* product */}
                            <div className="flex items-center gap-3 p-3 cursor-pointer transition-colors border-b border-border last:border-0">
                                <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden shrink-0">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-800">Raw Black T-Shirt Lineup</span>
                                    <span className="text-xs text-primary font-bold">$70.00</span>
                                </div>
                             </div>
                            {/* product */}
                            <div className="flex items-center gap-3 p-3 cursor-pointer transition-colors border-b border-border last:border-0">
                                <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden shrink-0">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-800">Raw Black T-Shirt Lineup</span>
                                    <span className="text-xs text-primary font-bold">$70.00</span>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
                <div className="icons flex items-center gap-8 ml-8 cursor-pointer">
                    <button onClick={openSideCart}>
                        <Link ><img src={Cart} alt="" /></Link>
                    </button>
                    <Link to={"account"}><img src={User} alt="" /></Link>
                </div>
            </div>
        </div>
    </>
  )
}

import { Link, NavLink } from 'react-router-dom'
import Logo from '../../../assets/logo.svg'
import Search from '../../../assets/Search.svg'
import Cart from '../../../assets/Cart.svg'
import User from '../../../assets/User.svg'
import Menu from '../../../assets/Menu.svg'
import { MenuBar } from './MenuBar';
import { useDrawerStore } from '../../../store'



export const NavBar = () => {

    const openMenu = useDrawerStore((state) => state.openMenu)

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
                </div>
                <div className="icons flex items-center gap-8 ml-8 cursor-pointer">
                    <Link to={"cart"}><img src={Cart} alt="" /></Link>
                    <Link to={"account"}><img src={User} alt="" /></Link>
                </div>
            </div>
        </div>
    </>
  )
}

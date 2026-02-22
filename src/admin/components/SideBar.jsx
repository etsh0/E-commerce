import Logo from "../../assets/Admin_logo.svg"
import CategoriesIcon from "../../assets/Dashboard.svg"
import DashboardIcon from "../../assets/Home.svg"
import ProductsIcon from "../../assets/Product.svg"
import OrdersIcon from "../../assets/Cart.svg"
import CustomersIcon from "../../assets/Users.svg"
import ReviewsIcon from "../../assets/Empty Star.svg"
import Logout from "../../assets/Logout.svg"
import { Link, NavLink } from 'react-router-dom';

export const SideBar = () => {

    const navLinks = [
    { name: 'Dashboard', icon: DashboardIcon, path:"" },
    { name: 'Categories', icon: CategoriesIcon, path:"categories" },
    { name: 'Products', icon: ProductsIcon, path:"products" },
    { name: 'Orders', icon: OrdersIcon, path:"orders" },
    { name: 'Customers', icon: CustomersIcon, path:"customers" },
    { name: 'Reviews', icon: ReviewsIcon, path:"reviews" }, 
    ];
  return (
    <>
        <div className="flex flex-col py-8 h-full">
            <div className="image w-full flex justify-center">
                <img className="w-35" src={Logo} alt="" />
            </div>
            <div className="flex flex-col gap-4 mt-15 w-full border-b-2 border-border pb-10">
                {
                    navLinks.map( (link,idx) => (
                        <NavLink key={idx} end to={link.path} className={ ({isActive}) => `flex items-center gap-4  py-2 pl-6 hover:bg-secondary transition-colors duration-300 ${isActive && "bg-secondary border-r-2 border-primary"} `}>
                            <img src={link.icon} alt="" />
                            <span className='text-sm font-medium text-primary'>{link.name}</span>
                        </NavLink>
                    ))
                }
            </div>
            <Link className='logout flex items-center gap-4 py-2 pl-6 mt-8'>
                <img src={Logout} alt="" />
                <span className='text-sm font-medium text-primary'>Logout</span>
            </Link>
        </div>
    </>
  )
}

import { MdClose } from "react-icons/md"
import { NavLink } from "react-router-dom"
import { useDrawerStore } from "../../../store"
import Logo from "../../../assets/logo.svg"

export const MenuBar = () => {


  const {isMenuOpen,closeMenu} = useDrawerStore()

    const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'profile', path: '/account' },
        { name: 'Shop', path: '/shop' },
        { name: 'cart', path: '/cart' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ]
  return (
    <>
        <div className={`overlay fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${isMenuOpen ? "opacity-100 visible backdrop-blur-xs" : "opacity-0 invisible"}`} onClick={closeMenu}></div>
        <div className={`sideBar w-full md:w-75 h-screen bg-white shadow-lg fixed top-0 left-0 z-100 transform transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-300"}`}>
          <div className="close-icon w-8 h-8 absolute top-0 right-0 flex items-center justify-center text-primary" onClick={closeMenu} >
            <MdClose size={"24px"} className="" />
          </div>
          <div className="flex flex-col mt-10 p-8">
              <h2 className="text-3xl font-medium mb-10 uppercase">Menu</h2>
              {/* <img className="w-40 mb-10" src={Logo} alt="" /> */}
              <div className="links flex flex-col gap-8">
                {
                  navLinks.map((link,idx) => (
                    <div key={idx} className="text-primary uppercase">
                      <NavLink to={link.path} onClick={closeMenu}>
                        {link.name}
                      </NavLink>
                    </div>
                  ))
                }
              </div>
          </div>
        </div>
    </>
  )
}

import Menu from "../../assets/Menu.svg"
import { useDrawerStore } from "../../store"
import { SideAccount } from "./SideAccount"

export const AccountHeader = ({title}) => {
    const {isSideAccountOpen,openSideAccount,closeSideAccount} = useDrawerStore()
  return (
    <>
        <div className='flex items-center justify-between'>
            <h4 className="text-xl font-medium text-primary mb-8">{title}</h4>
            <div className="icon cursor-pointer md:hidden" onClick={openSideAccount}>
                <img src={Menu} alt="" />
            </div>
            <div className={`overlay fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isSideAccountOpen ? "opacity-100 visible backdrop-blur-xs" : "opacity-0 invisible"}`} onClick={closeSideAccount}></div>
            <div className={`w-55 h-screen py-8 px-6 overflow-auto bg-white shadow fixed top-0 left-0 z-100 transform transition-transform duration-300 ease-in-out ${isSideAccountOpen ? "translate-x-0" : "-translate-x-100"}`}>
                <SideAccount />
            </div>
        </div>
    </>
  )
}

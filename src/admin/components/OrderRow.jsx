import { useState } from "react"
import More from "../../assets/More.svg"
import img from "../../assets/T-Shirt.svg"

export const OrderRow = () => {
    const [isDropdownOpen,setIsdropdowngopen] = useState(false)
    return (
        <>
        <tr className="text-gray-600 text-sm hover:bg-gray-50 transition">
            <td className="px-6 py-4 font-medium text-gray-800 line-clamp-1 flex items-center gap-2">
                <img className="w-10" src={img} alt="" />
                <span>Mens Black T-Shirts</span>
            </td>
            <td className="px-6 py-4">20 Mar, 2023</td>
            <td className="px-6 py-4">75.00 EGP</td>
            <td className="px-6 py-4">Processing</td>
            <td className="px-6 py-4 underline cursor-pointer">View details</td>
            <td className="px-6 py-4 cursor-pointer relative" onClick={ () => setIsdropdowngopen(!isDropdownOpen)}><img src={More} alt="" />
                <div className={`absolute right-0 z-50 w-30 bg-white shadow border border-border py-3  flex-col gap-1 ${isDropdownOpen ? "flex" : "hidden"}`}>
                    <button className="px-2 py-1 w-full text-left font-medium text-sm hover:bg-secondary transition-colors duration-300 cursor-pointer whitespace-nowrap">Change Status</button>
                </div>
            </td>
        </tr>
    </>
  )
}

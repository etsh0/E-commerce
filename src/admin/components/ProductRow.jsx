import { useState } from "react"
import Check from "../../assets/Check.svg"
import More from "../../assets/More.svg"
import img from "../../assets/T-Shirt.svg"

export const ProductRow = () => {
    const [isDropdownOpen,setIsdropdowngopen] = useState(false)
    return (
        <>
        <tr class="text-gray-600 text-sm hover:bg-gray-50 transition">
            <td class="px-6 py-4 font-medium text-gray-800 line-clamp-1 flex items-center gap-2">
                <img className="w-10" src={img} alt="" />
                <span>Mens Black T-Shirts</span>
            </td>
            <td class="px-6 py-4">$75.00</td>
            <td class="px-6 py-4">In Stock</td>
            <td class="px-6 py-4">Basic Tees</td>
            <td class="px-6 py-4"><img src={Check} alt="" /></td>
            <td class="px-6 py-4 cursor-pointer relative" onClick={ () => setIsdropdowngopen(!isDropdownOpen)}><img src={More} alt="" />
                <div className={`absolute right-0 z-50 w-30 bg-white shadow border border-border py-3  flex-col gap-1 ${isDropdownOpen ? "flex" : "hidden"}`}>
                <button className="px-4 py-1 w-full text-left font-medium text-sm hover:bg-secondary transition-colors duration-300 cursor-pointer">Edit</button>
                <button className="px-4 py-1 w-full text-left font-medium text-sm hover:bg-secondary transition-colors duration-300 cursor-pointer">Delete</button>
                <button className="px-4 py-1 w-full text-left font-medium text-sm hover:bg-secondary transition-colors duration-300 cursor-pointer">View</button>
                </div>
            </td>
        </tr>
    </>
  )
}

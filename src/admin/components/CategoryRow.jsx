import { useState } from "react"
import More from "../../assets/More.svg"


export const CategoryRow = ({category}) => {
    const [isDropdownOpen,setIsdropdowngopen] = useState(false)
  return (
    <>
        <tr className="text-gray-600 text-sm hover:bg-gray-50 transition">
            <td className="px-6 py-4 font-medium text-gray-800 line-clamp-1 flex items-center gap-4">
                <span>{category.name}</span>
            </td>
            <td className="px-6 py-4">{category.slug}</td>
            <td className="px-6 py-4">{category?.products?.length || 0}</td>
            <td className="px-6 py-4 cursor-pointer relative" onClick={ () => setIsdropdowngopen(!isDropdownOpen)}><img src={More} alt="" />
                <div className={`absolute left-7 z-50 w-30 bg-white shadow border border-border py-3  flex-col gap-1 ${isDropdownOpen ? "flex" : "hidden"}`}>
                    <button className="px-2 py-1 w-full text-left font-medium text-sm hover:bg-secondary transition-colors duration-300 cursor-pointer whitespace-nowrap">Edit</button>
                    <button className="px-2 py-1 w-full text-left font-medium text-sm hover:bg-secondary transition-colors duration-300 cursor-pointer whitespace-nowrap">Delete</button>
                </div>
            </td>
        </tr>   
    </>
  )
}

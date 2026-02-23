import { useState } from "react"
import More from "../../assets/More.svg"

export const CustomerRow = () => {
    const [isDropdownOpen,setIsdropdowngopen] = useState(false)
    return (
    <>
        <tr className="text-gray-600 text-sm hover:bg-gray-50 transition">
            <td className="px-6 py-4 font-medium text-gray-800 line-clamp-1 flex items-center gap-4">
                <div className="bg-secondary text-[#4078FF] px-4 py-3 rounded">EH</div>
                <span>Esther Howard</span>
            </td>
            <td className="px-6 py-4">esther.howard@gmail.com</td>
            <td className="px-6 py-4">8642 Yule Street, Arvada CO 80007</td>
            <td className="px-6 py-4 cursor-pointer relative" onClick={ () => setIsdropdowngopen(!isDropdownOpen)}><img src={More} alt="" />
                <div className={`absolute right-0 z-50 w-30 bg-white shadow border border-border py-3  flex-col gap-1 ${isDropdownOpen ? "flex" : "hidden"}`}>
                    <button className="px-2 py-1 w-full text-left font-medium text-sm hover:bg-secondary transition-colors duration-300 cursor-pointer whitespace-nowrap">Edit</button>
                </div>
            </td>
        </tr>
    </>
  )
}

import { useState } from "react"
import More from "../../assets/More.svg"
import star from "../../assets/FillStar.svg"


export const ReviewRow = () => {
    const [isDropdownOpen,setIsdropdowngopen] = useState(false)
  return (
    <>
        <tr className="text-gray-600 text-sm hover:bg-gray-50 transition">
            <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-4">
                <div className="bg-secondary text-[#4078FF] px-4 py-3 rounded">BT</div>
                <span className="truncate">Esther Howard</span>
            </td>
            <td className="px-6 py-4 max-w-50 truncate whitespace-nowrap">
                Completed the task and added the required documentation, can someone please
            </td>
            <td className="px-6 py-4 flex items-center">
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
            </td>
            <td className="px-6 py-4 cursor-pointer relative" onClick={ () => setIsdropdowngopen(!isDropdownOpen)}><img src={More} alt="" />
                <div className={`absolute left-7 z-50 w-30 bg-white shadow border border-border py-3  flex-col gap-1 ${isDropdownOpen ? "flex" : "hidden"}`}>
                    <button className="px-2 py-1 w-full text-left font-medium text-sm hover:bg-secondary transition-colors duration-300 cursor-pointer whitespace-nowrap">Delete</button>
                </div>
            </td>
        </tr>   
    </>
  )
}

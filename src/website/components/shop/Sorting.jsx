import { useState } from "react"
import arrowDown from "../../../assets/Chevron Down.svg"
export const Sorting = () => {

    const [isSortingOpen,setIsSortingopen] = useState(false)
  return (
    <>
        <div className="relative w-50" id="dropdwon">
            <button className="flex items-center justify-between w-full bg-gray-100 rounded-xl py-2 px-3 cursor-pointer" id="dropdownBtn" onClick={() => setIsSortingopen(!isSortingOpen)}>
                <span className="text-xs md:text-sm uppercase text-text" id="selectedText">Sort By</span>
                <img src={arrowDown} className={`transition-transform duration-300 ${isSortingOpen ? 'rotate-180' : 'rotate-0'}`} alt="" />
            </button>
            {/* <!-- options --> */}
            <ul className={`absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg text-sm md:text-[15px] flex-col gap-1 px-1 py-3 cursor-pointer overflow-hidden ${isSortingOpen ? "flex" : "hidden"}`} id="dropdownMenu">
                <li className="option px-3 py-1 rounded cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors">
                    <span className="label whitespace-nowrap text-sm">Price: Low to High</span>
                    <span className="check ">✔</span>
                </li>
                <li className="option px-3 py-1 rounded cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors">
                    <span className="label whitespace-nowrap text-sm">Price: High to Low</span>
                    <span className="check opacity-0">✔</span>
                </li>
                <li className="option px-3 py-1 rounded cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors">
                    <span className="label whitespace-nowrap text-sm">Name A-Z</span>
                    <span className="check opacity-0">✔</span>
                </li>
            </ul>
        </div>
    </>
  )
}

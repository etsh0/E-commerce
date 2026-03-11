import { useState } from "react"
import arrowDown from "../../../assets/Chevron Down.svg"
import { useFilterStore } from "../../../store"
export const Sorting = () => {

    const [isSortingOpen,setIsSortingopen] = useState(false)
    const {sortBy, setSortBy} = useFilterStore()

    const options = [
        { label: "Default / Newest", value: "createdAt:desc" },
        { label: "Price: Low to High", value: "price:asc" },
        { label: "Price: High to Low", value: "price:desc" },
        { label: "Name: A-Z", value: "title:asc" },
    ]

    const handleClickOption = (value) => {
        setSortBy(value)
        setIsSortingopen(false) 
    }

    const CurrentOption = options.find(opt => opt.value === sortBy)?.label 
  return (
    <>
        <div className="relative w-50" id="dropdwon">
            <button className="flex items-center justify-between w-full bg-gray-100 rounded-xl py-2 px-3 cursor-pointer" id="dropdownBtn" onClick={() => setIsSortingopen(!isSortingOpen)}>
                <span className="text-xs md:text-sm uppercase text-text" id="selectedText">{CurrentOption}</span>
                <img src={arrowDown} className={`transition-transform duration-300 ${isSortingOpen ? 'rotate-180' : 'rotate-0'}`} alt="" />
            </button>
            {/* <!-- options --> */}
            <ul className={`absolute z-50 top-12 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg text-sm md:text-[15px] flex-col gap-1 px-1 py-3 cursor-pointer overflow-hidden ${isSortingOpen ? "flex" : "hidden"}`} id="dropdownMenu">
                {
                    options.map( (option) => (
                        <li onClick={() => handleClickOption(option.value)} key={option.value} className="option px-3 py-1 rounded cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors">
                            <span className="label whitespace-nowrap text-sm">{option.label}</span>
                            <span className={`check transition-opacity ${sortBy === option.value ? "opacity-100" : "opacity-0"}`}>✔</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    </>
  )
}

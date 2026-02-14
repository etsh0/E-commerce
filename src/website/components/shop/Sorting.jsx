import arrowDown from "../../../assets/Chevron Down.svg"
export const Sorting = () => {
  return (
    <>
        <div class="relative w-50" id="dropdwon">
            <button class="flex items-center justify-between w-full bg-gray-100 rounded-xl py-2 px-3 cursor-pointer" id="dropdownBtn">
                <span class="text-xs md:text-sm uppercase text-text" id="selectedText">Sort By</span>
                <img src={arrowDown} alt="" />
            </button>
            {/* <!-- options --> */}
            <ul class="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg text-sm md:text-[15px] flex flex-col gap-1 px-1 py-3 cursor-pointer hidden overflow-hidden" id="dropdownMenu">
                <li class="option px-3 py-1 rounded cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors">
                    <span class="label whitespace-nowrap text-sm">Price: Low to High</span>
                    <span class="check ">✔</span>
                </li>
                <li class="option px-3 py-1 rounded cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors">
                    <span class="label whitespace-nowrap text-sm">Price: High to Low</span>
                    <span class="check opacity-0">✔</span>
                </li>
                <li class="option px-3 py-1 rounded cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors">
                    <span class="label whitespace-nowrap text-sm">Name A-Z</span>
                    <span class="check opacity-0">✔</span>
                </li>
            </ul>
        </div>
    </>
  )
}

import close from "../../../assets/close.svg"
import { Sorting } from "./Sorting"
import { ProductCard } from './../../../components/ProductCard';
import PaginationRounded from "./PaginationRounded";
import { IoFilter } from "react-icons/io5";
import { SideFilters } from "./SideFilters";
import { useDrawerStore } from "../../../store";


export const Products = () => {

  const {isSideFiltersOpen, closeSideFilters, openSideFilters} = useDrawerStore()
  return (
    <>
        <div className='grow px-4 py-6 border border-border rounded shadow mb-32'>
            <div className="apply-filter mb-6">
              <h4 className="text-sm font-medium">Applied filters:</h4>
              <div className='flex items-center gap-3 mt-4 '>
                  <div className='py-1.5 px-4 border border-border rounded-2xl text-xs font-medium flex items-center gap-2 cursor-pointer'>
                    Perfume
                    <img src={close} alt="" />
                  </div>
                  <div className='py-1.5 px-4 border border-border rounded-2xl text-xs font-medium flex items-center gap-2 cursor-pointer'>
                    Size: M
                    <img src={close} alt="" />
                  </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="products-number text-text text-xs sm:text-sm mb-4 sm:mb-0">
                  <span className="results-count">36</span> Products found. 
                </div>
                <div className="sorting flex  items-center gap-4">
                  <Sorting />
                  <div className="filters lg:hidden block cursor-pointer" onClick={openSideFilters}>
                    <IoFilter size={"20px"} />
                  </div>
                </div>
            </div>
            <div className="products-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
            <div className="pagination w-full flex items-center justify-center mt-16">
                <PaginationRounded />
            </div>
        </div>
        <div className={`overlay fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isSideFiltersOpen ? "opacity-100 visible backdrop-blur-xs" : "opacity-0 invisible"}`} onClick={closeSideFilters}></div>
        <div className={`sideFilters w-68 h-screen py-8 px-6 overflow-auto bg-white shadow-lg fixed top-0 left-0 z-100 transform transition-transform duration-300 ease-in-out ${isSideFiltersOpen ? "translate-x-0" : "-translate-x-300"}`}>
              <h2 className="text-2xl font-bold mb-6">Filter By</h2>
              <SideFilters />
        </div>
    </>
  )
}

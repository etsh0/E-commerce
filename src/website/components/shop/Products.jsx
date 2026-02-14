import close from "../../../assets/close.svg"
import { Sorting } from "./Sorting"
import { ProductCard } from './../../../components/ProductCard';
import PaginationRounded from "./PaginationRounded";


export const Products = () => {
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
            <div className="flex items-center justify-between">
                <div className="products-number text-text text-sm">
                  <span className="results-count">36</span> Products found. 
                </div>
                <div className="sorting">
                  <Sorting />
                </div>
            </div>
            <div className="products-container grid grid-cols-3 mt-4">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
            <div className="pagination flex items-center justify-center mt-16">
                <PaginationRounded />
            </div>
        </div>
        
    </>
  )
}

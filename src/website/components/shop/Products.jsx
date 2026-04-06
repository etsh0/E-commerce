import { Sorting } from "./Sorting"
import { ProductCard } from './../../../components/ProductCard';
import PaginationRounded from "./PaginationRounded";
import { IoFilter } from "react-icons/io5";
import { SideFilters } from "./SideFilters";
import { domain, useDrawerStore, useFilterStore, useUiStore } from "../../../store";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { ProductsLoader } from "../../../components/ProductsLoader";


export const Products = () => {

  const {isSideFiltersOpen, closeSideFilters, openSideFilters} = useDrawerStore()
  const [products, setProducts] = useState([])
  const {page , selectedCategories, setSelectedCategories, selectedColors, setSelectedColors, selectedSizes, setSelectedSizes, priceRange, sortBy} = useFilterStore()
  const [pageCount, setPageCount] = useState(1)
  const {isProductsLoading, setLoading} = useUiStore()


  useEffect( () => {
    let url = domain + '/api/products'
    const fetchProducts = async () => {
        setLoading("isProductsLoading", true)
        try {
            const res = await axios.get(url , {
                params: {

                    populate : '*',

                    pagination : {
                    page : `${page}` ,
                    pageSize : 6,
                  },
                    filters : {
                      category : {
                        slug : {
                          $in : selectedCategories.length > 0 ? selectedCategories : undefined // selected categories
                        }
                      },
                      colors : {
                        slug : {
                          $in : selectedColors.length > 0 ? selectedColors : undefined // selected colors
                        }
                      },
                      sizes : {
                        slug : {
                          $in : selectedSizes.length > 0 ? selectedSizes : undefined // selected sizes
                        }
                      },
                      price : {
                        $gte : priceRange[0], // الحد الادني
                        $lte : priceRange[1], // الحد الاقصي
                      }
                  },
                    sort : sortBy
                }
            })          
            setLoading("isProductsLoading", false)          
            setProducts(res.data.data)    
            setPageCount(res.data.meta.pagination.pageCount)
            
        }
        catch (error) {
            console.log(error);
        }
    }
    fetchProducts()
  } ,[page, selectedCategories, selectedColors, selectedSizes, priceRange, sortBy])

  
  return (
    <>
        <div className='grow px-4 py-6 border border-border rounded shadow mb-32 relative'>
          {
            isProductsLoading && (
              <div className="absolute inset-0 z-50 flex justify-center pt-50 bg-white transition-all">
                <ProductsLoader />
              </div>
            )
          }
          {
            (selectedCategories.length > 0 || selectedColors.length > 0 || selectedSizes.length > 0)  && (
              <div className="apply-filter mb-6">
                <h4 className="text-sm font-medium">Applied filters:</h4>
                <div className='flex items-center gap-3 mt-4 flex-wrap'>
                  
                  {
                    selectedCategories.map( (slug) => (
                    <div key={slug} className='py-1.5 px-4 border border-border rounded-2xl text-xs font-medium flex items-center gap-2 cursor-pointer'>
                      <div onClick={(e) => {
                        e.preventDefault()
                        setSelectedCategories(slug)
                      }}>
                          <IoMdClose size={"17px"} />
                      </div>
                      {slug.toUpperCase()}
                    </div>
                    ))
                    
                  }
                  {
                    selectedColors.map( (slug) => (
                      <div key={slug} className='py-1.5 px-4 border border-border capitalize rounded-2xl text-xs font-medium flex items-center gap-2 cursor-pointer'>
                        <div onClick={(e) => {
                          e.preventDefault()
                          setSelectedColors(slug)
                        }}>
                            <IoMdClose size={"17px"} />
                        </div>
                        Color: {slug}
                      </div>
                    ))
                  }
                  {
                    selectedSizes.map( (slug) => (
                      <div key={slug} className='py-1.5 px-4 border border-border rounded-2xl text-xs font-medium flex items-center gap-2 cursor-pointer'>
                        <div onClick={(e) => {
                          e.preventDefault()
                          setSelectedSizes(slug)
                        }}>
                            <IoMdClose size={"17px"} />
                        </div>
                        Size: {slug.toUpperCase()}
                      </div>
                    ))
                  }
                </div> 
              </div>
            )
          }
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="products-number text-text text-xs sm:text-sm mb-4 sm:mb-0">
                  <span className="results-count">{products?.length}</span> Products found. 
                </div>
                <div className="sorting flex  items-center gap-4">
                  <Sorting />
                  <div className="filters lg:hidden block cursor-pointer" onClick={openSideFilters}>
                    <IoFilter size={"20px"} />
                  </div>
                </div>
            </div>
            <div className="products-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4">
              {
                products.length >  0 ? (
                  products.map( (product) => (
                    <ProductCard key={product.documentId} product={product}/>
                  ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center mt-10">
                        <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-2">
                          No Products Founds
                        </h3>
                        <p className="text-xs md:text-sm text-text mx-auto mb-8">
                          We couldn't find any products matching your current filters.
                        </p>
                    </div>
                )
              }
            </div>
            <div className="pagination w-full flex items-center justify-center mt-16">
                <PaginationRounded pageCount={pageCount} page={page} />
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

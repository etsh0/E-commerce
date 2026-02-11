import React from 'react'
import { ProductCard } from '../../../components/ProductCard'

export const FeaturedLatest = () => {
  return (
    <>
        <div className='container my-38'>
            <h3 className='text-center text-2xl text-primary uppercase font-medium mb-10'>Trending Products</h3>
            <div className="header flex items-center justify-center gap-6 text-text">
                <button className='cursor-pointer'>Featured</button>
                <button className='cursor-pointer'>Latest</button>
                <button className='cursor-pointer'>Special</button>
            </div>
            <div className="products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    </>
  )
}

import React from 'react'
import { SideFilters } from '../components/shop/SideFilters'
import { Products } from '../components/shop/Products'
import { NewsLetter } from '../../components/NewsLetter'

export const Shop = () => {
  return (
    <>
        <div className='container flex items-start gap-6 mt-10'>
            <SideFilters />
            <Products />
        </div>
        <NewsLetter />
    </>
  )
}

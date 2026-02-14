import { SideFilters } from '../components/shop/SideFilters'
import { Products } from '../components/shop/Products'
import { NewsLetter } from '../../components/NewsLetter'
import { useDrawerStore } from '../../store'
import { useEffect } from 'react'

export const Shop = () => {

  const {isSideFiltersOpen} = useDrawerStore()

  useEffect(() => {
    if(isSideFiltersOpen) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    }
  },[isSideFiltersOpen])

  return (
    <>
        <div className='container flex items-start gap-6 mt-10'>
            <div className='w-65 px-4 py-6 border border-border rounded shadow hidden lg:block'>
              <SideFilters />
            </div>
            <Products />
        </div>
        <NewsLetter />
    </>
  )
}

import { useEffect } from 'react';
import { useCategoriesStore, useDrawerStore, useFilterStore } from '../../../store';
import { Colors } from '../Colors';
import { Sizes } from '../Sizes';
import RangeSlider from './RangeSlider';


export const SideFilters = () => {

    const {selectedCategories,setSelectedCategories, resetFilters} = useFilterStore()
    
    const {categories} = useCategoriesStore()


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
        <div className='flex flex-col gap-10 -z-10'>
            <div className="categories">
                <div className='flex items-center justify-between'>
                    <h4 className='text-xl font-medium'>Categories</h4>
                    <button onClick={() => resetFilters()} className="text-xs text-red-500 font-medium cursor-pointer underline">Clear All</button>
                </div>
                <div className='filters flex flex-col gap-4 mt-8'>
                    {
                        categories.map((cat) => {
                            
                            const isChecked = selectedCategories.includes(cat.slug); // true or false

                            return (
                            <label key={cat.documentId} className="filter-option flex items-center gap-3 cursor-pointer py-2 pl-2 rounded-lg hover:bg-[#f8fafc] transition-all duration-300 ease-in-out">
                                <input checked={isChecked} onChange={() => setSelectedCategories(cat.slug)} className="hidden" type="checkbox" />
                                <span className="checkmark w-4.5 h-4.5 border border-border rounded transition-all duration-300 ease-in-out relative"></span>
                                <span className="text-[#474B57] ">{cat.name}</span>
                            </label>
                        )
                        })
                    }
                </div>
            </div>
            <div className='colors'>
                <h4 className='text-xl font-medium'>Color</h4>
                <Colors />
            </div>
            <div className='sizes'>
                <h4 className='text-xl font-medium'>Size</h4>
                <Sizes />
            </div>
            <div className="price">
                <h4 className='text-xl font-medium'>Price</h4>
                <div className="price-range mt-6">
                    <RangeSlider />
                </div>
            </div>
        </div>
    </>
  )
}

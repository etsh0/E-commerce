
import { useEffect, useState } from 'react';
import { domain, useDrawerStore } from '../../../store';
import { Colors } from '../Colors';
import { Sizes } from '../Sizes';
import RangeSlider from './RangeSlider';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SideFilters = () => {
    const [categories , setCategories] = useState([])

    useEffect(() => {
        let url = domain + "/api/categories"
        const fetchCategories = async () => {
            try { 
                const res = await axios.get(url)
                setCategories(res.data.data)
            }
            catch(error) {           
                toast.error(error.response.data.error.message)
            }
        }
        fetchCategories()
    } ,[])

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
        <div className='flex flex-col gap-10'>
            <div className="categories">
                <h4 className='text-xl font-medium'>Categories</h4>
                <div className='filters flex flex-col gap-4 mt-8'>
                    {
                        categories.map((cat) => (
                            <label key={cat.documentId} className="filter-option flex items-center gap-3 cursor-pointer py-2 pl-2 rounded-lg hover:bg-[#f8fafc] transition-all duration-300 ease-in-out">
                                <input className="hidden" type="checkbox" />
                                <span className="checkmark w-4.5 h-4.5 border border-border rounded transition-all duration-300 ease-in-out relative"></span>
                                <span className="text-[#474B57] ">{cat.name}</span>
                            </label>
                        ))
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


import { Colors } from '../Colors';
import { Sizes } from '../Sizes';
import RangeSlider from './RangeSlider';
export const SideFilters = () => {

    const categories = ["Perfume", "Trousers", "Shoes", "Handbag", "Hat","Thermos"]
  return (
    <>
        <div className='flex flex-col gap-10'>
            <div className="categories">
                <h4 className='text-xl font-medium'>Categories</h4>
                <div className='filters flex flex-col gap-4 mt-8'>
                    {
                        categories.map((cat,idx) => (
                            <label className="filter-option flex items-center gap-3 cursor-pointer py-2 pl-2 rounded-lg hover:bg-[#f8fafc] transition-all duration-300 ease-in-out">
                                <input className="hidden" type="checkbox" />
                                <span className="checkmark w-4.5 h-4.5 border border-border rounded transition-all duration-300 ease-in-out relative"></span>
                                <span className="text-[#474B57] " key={idx}>{cat}</span>
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

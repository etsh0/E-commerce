
import RangeSlider from './RangeSlider';
export const SideFilters = () => {

    const categories = ["Perfume", "Trousers", "Shoes", "Handbag", "Hat","Thermos"]
    const sizes = ["s","m","l","xl","xxl"]
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
            <div className="color">
                <h4 className='text-xl font-medium'>Color</h4>
                <div className="flex items-center gap-4 mt-4">
                    <div className="p-1 border rounded-full cursor-pointer">
                        <div className="circle w-6 h-6 bg-[#A3BEF8] rounded-full"></div>
                    </div>
                    <div className="p-1 rounded-full cursor-pointer">
                        <div className="circle w-6 h-6 bg-[#FFD58A] rounded-full"></div>
                    </div>
                    <div className="p-1 rounded-full cursor-pointer">
                        <div className="circle w-6 h-6 bg-[#83B18B] rounded-full"></div>
                    </div>
                    <div className="p-1 rounded-full cursor-pointer">
                        <div className="circle w-6 h-6 bg-[#4078FF] rounded-full"></div>
                    </div>
                </div>  
            </div>
            <div className="size">
                <h4 className='text-xl font-medium'>Size</h4>
                <div className="flex items-center flex-wrap gap-2 mt-4">
                    {
                        sizes.map( (size,idx) => (
                            <span key={idx} className="px-4 py-3 border border-border rounded-lg uppercase text-xs font-medium text-text cursor-pointer">{size}</span>
                        ))
                    }
                </div>
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

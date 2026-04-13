import { SideFilters } from '../components/shop/SideFilters'
import { Products } from '../components/shop/Products'
import { NewsLetter } from '../../components/NewsLetter'


export const Shop = () => {


  return (
    <>
        <div className='container flex items-start gap-6 mt-10 '>
            <div data-aos="fade-right" data-aos-duration="800" className='w-65 px-4 py-6 border border-border rounded shadow hidden lg:block'>
              <SideFilters />
            </div>
            <div className='flex-1' data-aos="fade-up" data-aos-duration="800">
              <Products />
            </div>
        </div>
        <NewsLetter />
    </>
  )
}

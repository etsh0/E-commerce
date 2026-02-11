import HeroImg from '../../../assets/دون عنوان (720 x 1280 بيكسل).png'
import classic from '../../../assets/Classic.svg'
import { Button } from './../../../components/Button';

export const Hero = () => {
  return (
    <>
        <div className="container flex flex-col md:flex-row items-center justify-between h-full">
            <div className="content z-10 w-full text-center md:text-left pt-25 md:pt-0">
                <h2 className='text-[40px] md:text-h1 text-primary font-medium mb-3'>Fresh Arrivals Online</h2> 
                <p className='text-text mb-6'>Discover Our Newest Collection Today.</p>
                <Button text={"View Collection"} />
            </div>
            <div className="image w-full md:mt-0">
                <img className='hidden md:flex' src={HeroImg} alt="" />
            </div>
            <img className='md:hidden absolute w-full' src={classic} alt="" />
        </div>
    </>
  )
}

import { Link } from 'react-router-dom';
import HeroImg from '../../../assets/060426-eg-m-yeni_jpg.webp'

export const Hero = () => {
  return (
    <>
        <div className="hero-content relative h-screen">
            <img className='w-full h-full object-cover' src={HeroImg} alt="" />
            <Link to={"/shop"} className="btn-animate bg-white text-primary md:before:bg-primary md:hover:text-white mb-8 absolute bottom-15 left-1/2 -translate-x-1/2 -translate-y-1/2 py-3 px-8 tracking-wider text-[15px] font-normal uppercase border-0">
                <span>Shop Now</span>
            </Link>
        </div>
    </>
  )
}


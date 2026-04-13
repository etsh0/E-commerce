import { Hero } from '../components/Home/Hero'
import { HeroCard } from '../components/Home/HeroCard'
import Delivery from '../../assets/Delivery.svg'
import ShieldCheck from '../../assets/Shield Check.svg'
import StarPage from '../../assets/Star Badge.svg'
import  Person  from '../../assets/person2.svg'
import { Link } from 'react-router-dom'
import { NewsLetter } from '../../components/NewsLetter'
import { FeaturedLatest } from '../components/Home/FeaturedLatest'
import { useEffect, useState } from 'react'
import { domain } from '../../store'
import axios from 'axios'
import { ProductCard } from '../../components/ProductCard'
import { ProductSkeletonCard } from '../../components/ProductSkeletonCard'


// swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';

export const Home = () => {
    const [bestSellingProducts , setBestSellingProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect( () => {
        const fetchBestSellingProducts = async () => {
            setIsLoading(true)
            let url = domain + '/api/products'
            try {
                const res = await axios.get(url , {
                    params: {
                        populate: '*',
                        filters: {
                            isBestSelling: {
                                $eq : true
                            }
                        },
                        pagination : {
                            limit: 8
                        }
                    }
                })
                setBestSellingProducts(res.data.data)
                
            } catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchBestSellingProducts()
    } ,[])

  return (
    <>
        <div className="home">
            <Hero />
        </div>
        <div className="cards container mt-22 mb-18 flex flex-col md:flex-row items-center justify-between gap-13.5">
            <div data-aos="fade-up" data-aos-delay="0">
                <HeroCard icon={Delivery} title={"Free Shipping"} p={"Upgrade your style today and get FREE shipping on all orders! Don't miss out."}/>
            </div>
            <div data-aos="fade-up" data-aos-delay="150">
                <HeroCard icon={StarPage} title={"Satisfaction Guarantee"} p={"Shop confidently with our Satisfaction Guarantee: Love it or get a refund."}/>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
                <HeroCard icon={ShieldCheck} title={"Secure Payment"} p={"Your security is our priority. Your payments are secure with us."}/>
            </div>
        </div>
        <div className="bestSelling py-18">
            <div data-aos="fade-right" data-aos-duration="600" className="title text-center">
                <p className='text-text text-p uppercase'>Shop Now</p>
                <h3 className='text-h3 text-primary font-bold'>Best Selling Products</h3>
            </div>
            <div data-aos="fade-up" data-aos-duration="800" className="bestSelling container mt-20">
                <Swiper
                    slidesPerView={1.5}       
                    spaceBetween={15}        
                    freeMode={true}          
                    grabCursor={true}      
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2.5, spaceBetween: 20 },
                        1024: { slidesPerView: 3.5, spaceBetween: 30 },
                        1280: { slidesPerView: 4, spaceBetween: 30 },
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper pb-14!" 
                >
                    {
                    isLoading ? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <SwiperSlide key={index}>
                                <ProductSkeletonCard />
                            </SwiperSlide>
                        ))
                    )
                    :
                    bestSellingProducts?.map((product) => (
                        <SwiperSlide key={product.documentId}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
        <div className="newSession bg-secondary">
            <div className="container flex items-center justify-between">
                <div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine" className="content relative">
                    <h3 className='text-[12px] md:text-h3 uppercase text-text mb-1'>New Season New Style</h3>
                    <h1 className='md:text-h1 font-medium'>30-70% Off On Men's Apparel</h1>
                    <Link to={"/shop"} className="btn-animate bg-primary text-white md:before:bg-white md:hover:text-primary mb-8 py-3 px-8 tracking-wider text-[15px] font-normal uppercase w-fit">
                        <span>Shop Now</span>
                    </Link>
                </div>
                <div data-aos="fade-left" data-aos-offset="300" data-aos-easing="ease-in-sine"  className="image w-100">
                    <img className='w-full' src={Person} alt="" />
                </div>
            </div>
        </div>
        <div className="FeaturedLatest">
            <FeaturedLatest />
        </div>
        <NewsLetter />
    </>
  )
}

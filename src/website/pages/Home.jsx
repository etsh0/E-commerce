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


export const Home = () => {
    const [bestSellingProducts , setBestSellingProducts] = useState([])

    useEffect( () => {
        const fetchBestSellingProducts = async () => {
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
                            limit: 4
                        }
                    }
                })
                setBestSellingProducts(res.data.data)
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchBestSellingProducts()
    } ,[])

  return (
    <>
        <div className="home h-full bg-secondary overflow-hidden relative py-15 md:py-0">
            <Hero />
        </div>
        <div className="cards container mt-22 mb-18 flex flex-col md:flex-row items-center justify-between gap-13.5">
            <HeroCard icon={Delivery} title={"Free Shipping"} p={"Upgrade your style today and get FREE shipping on all orders! Don't miss out."}/>
            <HeroCard icon={StarPage} title={"Satisfaction Guarantee"} p={"Shop confidently with our Satisfaction Guarantee: Love it or get a refund."}/>
            <HeroCard icon={ShieldCheck} title={"Secure Payment"} p={"Your security is our priority. Your payments are secure with us."}/>
        </div>
        <div className="bestSelling py-18">
            <div className="title text-center">
                <p className='text-text text-p uppercase'>Shop Now</p>
                <h3 className='text-h3 text-primary font-bold'>Best Selling Products</h3>
            </div>
            <div className="bestSelling container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-20">
                {
                    bestSellingProducts?.map( (product) => (
                        <ProductCard key={product.documentId} product={product}/>
                    ))
                }
            </div>
        </div>
        <div className="newSession bg-secondary">
            <div className="container flex items-center justify-between">
                <div className="content">
                    <h3 className='text-[12px] md:text-h3 uppercase text-text mb-1'>New Season New Style</h3>
                    <h1 className='md:text-h1 font-medium'>30-70% Off On Men's Apparel</h1>
                    <button className='mt-5 bg-primary text-white px-4 py-2 text-xs md:text-sm'>
                        <Link to={"shop"}>Shop Now</Link>
                    </button>
                </div>
                <div className="image w-100">
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

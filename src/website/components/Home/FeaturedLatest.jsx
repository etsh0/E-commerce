import { useEffect, useState } from "react";
import axios from "axios";
import { domain } from "../../../store";
import { ProductCard } from "../../../components/ProductCard";
import { ProductSkeletonCard } from "../../../components/ProductSkeletonCard";

// swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, Autoplay } from 'swiper/modules';

export const FeaturedLatest = () => {
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState("latest"); 
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true)
            try {
                const params = {
                    populate: "*",
                    pagination: { limit: 10 }, 
                };

                if (activeTab === "latest") {
                    params.sort = ["createdAt:desc"];
                } else if (activeTab === "featured") {
                    params.filters = {
                        isFeatured: { $eq: true }
                    };
                }

                const res = await axios.get(`${domain}/api/products`, { params });
                setProducts(res.data.data);
            } catch (error) {
                console.error("Error:", error);
            }
            finally {
                setIsLoading(false)
            }
        };

        fetchProducts();
    }, [activeTab]); 

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <h2 className="text-2xl font-bold uppercase tracking-tight">
                        {activeTab === "latest" ? "New Arrivals" : "Featured Items"}
                    </h2>
                    
                    <div className="flex gap-6 mt-4 md:mt-0 text-sm font-medium">
                        <button 
                            onClick={() => setActiveTab("latest")}
                            className={`cursor-pointer transition-colors hover:text-primary duration-300 ${activeTab === 'latest' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            LATEST
                        </button>
                        <button 
                            onClick={() => setActiveTab("featured")}
                            className={`cursor-pointer transition-colors hover:text-primary duration-300 ${activeTab === 'featured' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
                        >
                            FEATURED
                        </button>
                    </div>
                </div>
                {/* swiper */}

                <Swiper
                    slidesPerView={1.5}       
                    spaceBetween={15}        
                    freeMode={true}          
                    grabCursor={true}      
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2.5, spaceBetween: 20 },
                        1024: { slidesPerView: 3.5, spaceBetween: 30 },
                        1280: { slidesPerView: 4, spaceBetween: 30 },
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
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
                    products.map((product) => (
                        <SwiperSlide key={product.documentId}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))
                    
                    }
                </Swiper>
            </div>
        </section>
    );
};
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { domain } from '../store';
import noImg from "../assets/noImg.png"


export const ImgSwiper = ({product_images}) => {
  return (
    <>
        <Swiper
            pagination={{
            dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
        >
          {product_images?.length > 0 ? (
            product_images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img 
                  src={domain + img.url} 
                  alt={`product-image-${idx}`} 
                  className="w-full h-full object-contain"
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className='border border-border'>
              <img src={noImg} alt="no-image" className="w-full h-full object-cover" />
            </SwiperSlide>
          )}
        </Swiper>
    </>
  )
}
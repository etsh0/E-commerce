import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { domain } from '../store';


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
          {
            product_images?.map( (img,idx) => (
              <SwiperSlide key={idx} >
                <img src={domain + img.url} alt="" />
              </SwiperSlide>
            ))
          }
        </Swiper>
    </>
  )
}
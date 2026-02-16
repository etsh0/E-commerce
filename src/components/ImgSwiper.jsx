import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import img from "../assets/Gemini_Generated_Image_e20uuqe20uuqe20u.png"
import img2 from "../assets/تصميم بدون عنوان (1).svg"
import img3 from "../assets/تصميم بدون عنوان.svg"


export const ImgSwiper = () => {
  return (
    <>
        <Swiper
            pagination={{
            dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
        >
            <SwiperSlide><img className='' src={img} alt="" /></SwiperSlide>
            <SwiperSlide><img className='' src={img2} alt="" /></SwiperSlide>
            <SwiperSlide><img className='' src={img3} alt="" /></SwiperSlide>
        </Swiper>
    </>
  )
}


import style from "../Home/home.module.css";

import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

const CarsSwiper = () => {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="max-w-[260px] h-[340px] text-black "
      >
        <SwiperSlide
          className={`${style.swiperSlide} text-center bg-[#F8D7DA] text-black flex flex-col justify-around items-center py-4 px-3`}
        >
          <div>
            <p className="text-lg mb-6">🛒 Shop the Latest Trends!</p>
            <p className="text-base">
              Discover new arrivals and trendy styles to elevate your wardrobe.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className={`${style.swiperSlide} text-center bg-[#B0E0E6] text-black flex flex-col justify-around items-center py-4 px-3`}
        >
          <div>
            <p className="text-lg mb-6">💸 Big Savings Await!</p>
            <p className="text-base">
              Enjoy exclusive discounts and unbeatable deals on your favorite
              products.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className={`${style.swiperSlide} text-center bg-[#E6E6FA]  text-black flex flex-col justify-around items-center py-4 px-3`}
        >
          <div>
            <p className="text-lg mb-6">🚚 Free Shipping on Orders Over $50!</p>
            <p className="text-base">
              Get your items delivered to your doorstep without any extra cost.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className={`${style.swiperSlide} text-center bg-[#F0FFF0]  text-black flex flex-col justify-around items-center py-4 px-3`}
        >
          <div>
            <p className="text-lg mb-6">⭐️ Customer Favorites</p>
            <p className="text-base">
              Check out top-rated products loved by our community!
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default CarsSwiper;

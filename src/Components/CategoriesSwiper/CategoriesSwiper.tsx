import React from "react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";
import CandleCake from "../CandleCake/CandleCake";
import CardComponent from "../Card/Card";
import Search from "../SearchComp/Search";



const CategoriesSwiper = ({subcategories}) => {
  return (
    <>
      <div className="w-[90%] px-11  mx-auto max-h-[500px] pt-14 pb-8   flex justify-center dark:bg-[#1E201E] dark:border-white/20 dark:border-b border-black ">
        <Swiper
          slidesPerView={1}
          grid={{
            rows: 2,
          }}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Grid, Pagination]}
          className=" p-8 dark:border dark:border-white/25 shadow-lg"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        >
          {subcategories.length > 0 ? (
            subcategories.map((item) => (
              <SwiperSlide
                key={item._id}
                className="shadow-md hover:-translate-y-2 duration-500 cursor-pointer text-center text-lg bg-white 
                h-[calc((100%-30px)/2)] 
                sm:h-[calc((100%-40px)/2)] 
                md:h-[calc((100%-50px)/2)] 
                lg:h-[calc((100%-60px)/2)] 
                flex items-center justify-center
                dark:bg-[#707070] dark:text-white"
              >
                {item.name}
              </SwiperSlide>
            ))
          ) : (
            <p>No subcategories available.</p>
          )}
        </Swiper>
      </div>
    </>
  );
};

export default CategoriesSwiper;

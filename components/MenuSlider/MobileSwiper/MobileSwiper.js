import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./styles.module.css";

// import required modules
import { Pagination, Navigation } from "swiper";

export default function Slider({ links, handleItem }) {
  const [swiperRef, setSwiperRef] = useState(null);


  return (
    <>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        className={styles.mySwiper}
      >
        { links ? links.map((el, i) => {
          return (
            <SwiperSlide key={i} className={styles.s}>
              <button
                key={i}
                className={styles.btn}
                type="button"
                onClick={() => handleItem(el.id)}
              >
                {el.name}
              </button>
            </SwiperSlide>
          );
        }) : null }
      </Swiper>
    </>
  );
}

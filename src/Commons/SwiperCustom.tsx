import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const SwiperCustom = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      style={{
        width: "100%",
        height: "420px",
      }}
    >
      <SwiperSlide>
        <img
          style={{
            width: "100%",
            height: "700px",
            objectFit: "cover"
          }}
          src="https://www.allrecipes.com/thmb/gDJ1S6ETLfWGyyWw_4A_IGhvDYE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9295_red-velvet-cake_ddmfs_4x3_1129-a8ab17b825e3464a9a53ceeda54ff461.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img
          style={{
            width: "100%",
            height: "700px",
            objectFit: "cover"
          }}
          src="https://static.onecms.io/wp-content/uploads/sites/43/2022/08/26/60564-StrawberryCakeFromScratch-ddfms-4X3-0291-1.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img
          style={{
            width: "100%",
            height: "700px",
            objectFit: "cover"
          }}
          src="https://cf-images.us-east-1.prod.boltdns.net/v1/static/474428695/a4c0c78e-2932-40fb-a787-f8522b53edc8/f7ee72ae-fc20-4ba5-aea6-a66b697599f1/1280x720/match/image.jpg" alt="" />
      </SwiperSlide>
    </Swiper>
  );
};

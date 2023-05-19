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
        height: "700px",
      }}
    >
      <SwiperSlide>
        <img
          style={{
            width: "100%",
            height: "700px",
            objectFit: "cover"
          }}
          src="https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://www.thesprucepets.com/thmb/hxWjs7evF2hP1Fb1c1HAvRi_Rw0=/2765x0/filters:no_upscale():strip_icc()/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://media.cnn.com/api/v1/images/stellar/prod/201030094143-stock-rhodesian-ridgeback.jpg?q=w_2187,h_1458,x_0,y_0,c_fill" alt="" />
      </SwiperSlide>
    </Swiper>
  );
};

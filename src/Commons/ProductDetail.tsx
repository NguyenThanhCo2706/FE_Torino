import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Navigation, FreeMode, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productApi from "../api/productApi";
import { thousandSeparator } from "../utils";
import { toast } from 'react-toastify';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgressCustom } from './CircularProgressCustom';

export const ProductDetail = () => {
  const params: any = useParams();
  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    productApi.getOne(+params.id).then((data) => {
      setProduct(data);
      setLoading(false);
    })
  }, []);

  const handleAddCart = () => {
    const order = JSON.parse(localStorage.getItem("order") || "");
    const index = order.orderDetails.findIndex((detail: any) => detail.productId === product.id);
    if (index !== -1) {
      order.orderDetails[index].quantity += 1;
    }
    else {
      order.orderDetails.push({
        productId: product.id,
        productName: product.name,
        categoryName: product.categoryName,
        productImage: product.pictures[0].src,
        quantity: 1,
        price: product.price,
      })
    }
    localStorage.setItem("order", JSON.stringify(order));
    toast.success("Add to cart success!");

  }

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(+e.target.value)
  }

  return (
    <>
      <div className="text-gray-700 body-font overflow-hidden bg-white border-b-2">
        <div className="container mx-auto m-5">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2">
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className='rounded border'
              >
                {
                  product.pictures?.map((picture: { id: number, src: string }, index: number) => {
                    return (
                      <SwiperSlide key={index}>
                        <img src={picture.src}
                          alt=""
                          className="w-full h-[600px] m-auto object-cover"
                        />
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mt-[20px]"
              >
                {
                  product.pictures?.map((picture: { id: number, src: string }, index: number) => {
                    return (
                      <SwiperSlide key={index}>
                        <img src={picture.src}
                          alt=""
                          className="w-[100px] h-[100px] object-cover m-auto hover:cursor-pointer"
                        />
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <div className="flex float-row items-center">
                <h1 className="text-gray-900 text-3xl title-font font-medium me-3">{product.name}</h1>
                <div className="bg-slate-400 px-3 py-1 rounded-[20px]">{product.categoryName}</div>
              </div>
              <div className="flex mb-2">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <div className="flex float-row items-center mb-3">
                {
                  product.tags?.map((tag: string, index: number) => {
                    return (
                      <>
                        <div key={index} className="bg-slate-400 px-3 rounded-[20px] me-3">{tag}</div>
                      </>
                    )
                  })
                }
                <div className="bg-slate-400 px-3 py-1 rounded-[20px] me-3">hot trend</div>
                <div className="bg-slate-400 px-3 py-1 rounded-[20px]">discount</div>
              </div>
              <p className="leading-relaxed font-bold">
                Nguyên liệu:
              </p>
              <div className="p-3">
                <p>Củ hành</p>
                <p>Siêu bành ngọt</p>
                <p>Củ Chuối</p>
                <p>Hành tây</p>
              </div>
              <div className="mb-3">
                <span className="italic">Ghi Chú: </span>This is example detail information for product, you can order with product
              </div>
              <div>
                <div className="flex items-center gap-x-8 ">
                  <div className="text-black text-[40px] hover:cursor-pointer" onClick={() => setQuantity((prev) => prev === 0 ? 0 : prev - 1)}>
                    -
                  </div>
                  <input
                    className="bg-slate-600 py-1 text-white text-[20px] w-[80px] text-center rounded-[3px] "
                    type="number"
                    value={quantity}
                    onChange={(e) => handleChangeQuantity(e)}
                  />
                  <div className="text-black text-[40px] hover:cursor-pointer" onClick={() => setQuantity((prev) => prev + 1)}>
                    +
                  </div>
                  <div
                    className="flex flex-row min-w-[180px] px-4 py-2 bg-blue-100 rounded-[10px] cursor-pointer hover:bg-blue-400"
                    onClick={handleAddCart}
                  >
                    <AddShoppingCartIcon />
                    <p className="text-[16px] m-auto text-center">
                      ADD TO CART
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex mt-6 items-center border-b-2 border-gray-200 mb-5">

              </div>
              <div className="flex justify-end">
                <span className="title-font font-medium text-2xl text-gray-900">{thousandSeparator(product.price || 0)}VND</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        loading && <CircularProgressCustom />
      }
    </>
  )
}
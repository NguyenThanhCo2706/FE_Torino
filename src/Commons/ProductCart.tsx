import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Typography } from '@mui/material';
import { thousandSeparator } from '../utils';
import { useNavigate } from 'react-router-dom';
export default function BasicCard(props: any) {
  const { product } = props;
  const navigate = useNavigate();

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
        productImage: product.images[0],
        quantity: 1,
        price: product.price,
      })
    }
    localStorage.setItem("order", JSON.stringify(order));
  }
  return (
    <Card variant="outlined" sx={{ width: "auto", margin: '10px' }}>
      <div className="flex flex-row items-center justify-between mb-2">
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: 'bold' }}
        >
          {product.name}
        </Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          onClick={() => { navigate(`product/${product.id}`); }}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        style={{
          minHeight: "150px",
          maxHeight: "300px",
          margin: 2
        }}
      >
        {
          product.images.length === 0 ?
            <>
              <div className='h-[300px]' />
            </>
            : product.images.map((imageUrl: string, index: number) => {
              return (
                <React.Fragment key={index}>
                  <SwiperSlide>
                    <img src={imageUrl} alt="" style={{
                      width: "300px",
                      height: "300px",
                      margin: "auto",
                      objectFit: "cover"
                    }} />
                  </SwiperSlide>
                </React.Fragment>
              )
            })
        }
      </Swiper>
      <Box sx={{ display: 'flex', padding: "15px", }}>
        <div>
          <Typography>Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {thousandSeparator(product.price)} VND
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
          onClick={handleAddCart}
        >
          <AddShoppingCartIcon /> Add
        </Button>
      </Box>
    </Card>
  );
}

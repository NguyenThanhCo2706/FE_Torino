import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { Button, Card } from '@mui/material';

import { thousandSeparator } from '../utils';
import 'react-toastify/dist/ReactToastify.css';
import { OrderDetail } from '../types';
import { orderDetailActions } from '../redux/reducers/orderDetailSlice';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import HouseIcon from '@mui/icons-material/House';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ProductCard(props: any) {
  const { product } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const disPatch = useDispatch();

  const handleAddCart = () => {
    const orderDetail: OrderDetail = {
      productId: product.id,
      productName: product.name,
      categoryName: product.categoryName,
      productImage: product.images[0],
      quantity: 1,
      price: product.price,
    }
    disPatch(orderDetailActions.addOrderDetail(orderDetail));
    toast.success(t("message.cart.successAdd"));
  }
  return (
    <>
      {/* <Card variant="outlined" sx={{ width: "100%", margin: '10px' }}>
        <div className="p-[30px]">
          <div className="relative w-full h-[270px] group hover:cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
            <img className='rounded-[100%] mx-auto w-[250px] h-[250px] object-cover absolute top-0 left-0 bottom-0 right-0 group-hover:opacity-0 group-hover:invisible transition-all duration-1000' src={product?.images[0]} alt="cac" />
            <img className='rounded-[100%] mx-auto w-[250px] h-[250px] object-cover absolute top-0 left-0 bottom-0 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-1000' src={product?.images[1]} alt="cac1" />
          </div>
          <div>
            <h1 className='text-center font-bold text-[20px]'>{product.categoryName}</h1>
            <div className='flex flex-row items-center justify-evenly my-2'>
              <h1
                onClick={() => navigate(`/product/${product.id}`)}
                className='text-[#fdcc45] font-bold hover:cursor-pointer truncate hover:underline'>{product.name}</h1>
              <Button
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: 'auto', fontWeight: 600 }}
                onClick={handleAddCart}
              >
                <AddShoppingCartIcon /> Add
              </Button>
            </div>
            <div className='h-[100px] text-center'>
              {product.description}
            </div>
          </div>
        </div>
        <div className='flex flex-row items-center justify-evenly bg-slate-700 p-[20px]'>
          <p className='text-[20px] text-[#ebe83b] font-bold underline'>
            {thousandSeparator(product.price)} VND
          </p>
          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full flex items-center justify-center">
            <span className='mr-[10px]'>View Detail</span> <AdsClickIcon />
          </button>
        </div>
      </Card > */}
      <Card sx={{ marginBottom: '30px', padding: "20px" }}>
        <div className="flex text-[18px]">
          <div className="flex justify-center">
            <div className="relative w-[200px] h-full group hover:cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
              <img className=' mx-auto w-[200px] h-full object-cover absolute top-1/2 -translate-y-1/2 left-0 right-0 group-hover:opacity-0 group-hover:invisible transition-all duration-1000' src={product?.images[0]} alt="" />
              <img className='rounded-[100%] mx-auto w-[200px] h-[200px] object-cover absolute top-1/2 -translate-y-1/2 left-0 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-1000' src={product?.images[1]} alt="" />
            </div>
          </div>
          <div className='ms-10 w-auto'>
            <div className='border-b'>
              <h1
                className='font-semibold text-[20px] truncate w-auto hover:underline hover:cursor-pointer'
                onClick={() => navigate(`/product/${product.id}`)}
              >{product.name}</h1>
              <p className='italic'>{product.categoryName}</p>
              <div className='my-5'>
                <span>from <span className="font-semibold">{thousandSeparator(product.price)}</span> VND</span>
                <span className='mx-2'>|</span>
                <span className='text-[16px]'>Shippable Entrements</span>
              </div>
            </div>
            <div>
              <div className='my-2'>
                <DirectionsBikeIcon />
                <span className="ms-4">Home Shipping</span>
              </div>
              <div className='my-2'>
                <HouseIcon />
                <span className="ms-4">Collect in Store</span>
              </div>
            </div>
            <div className='flex text-[20px]'>
              <button
                onClick={handleAddCart}
                className='border-2 py-1 px-3 hover:bg-green-600 hover:border-green-700 hover:text-white'
              >Add to cart</button>
              <button className='border-2 py-1 px-2 ms-3'><FavoriteIcon /></button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

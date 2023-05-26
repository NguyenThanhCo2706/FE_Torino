import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { Button, Card } from '@mui/material';
import { thousandSeparator } from '../utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function ProductCard(props: any) {
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
    toast.success("Add to cart success!");
  }
  return (
    <>
      <Card variant="outlined" sx={{ width: "auto", margin: '10px' }}>
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
              {product.description || <>Chưa có mô tả</>}
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
      </Card >
      <ToastContainer />
    </>
  );
}

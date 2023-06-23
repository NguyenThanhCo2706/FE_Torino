import { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './Commons/NotFound';
import { Home } from './Components/Home';
import { Cart } from './Components/Cart';
import { Profile } from './Components/Profile';
import { Product } from './Components/Product';
import { ProductCategory } from './Components/Product/category';
import { Payment } from './Components/Cart/payment';
import { HomePage } from './Components/Home/HomePage';
import { Contact } from './Components/contact';
import { Order, OrderDetail } from './types';
import { ToastContainer, toast } from 'react-toastify';
import categoryApi from './api/categoryApi';
import Auth from './Components/Auth';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import { useDispatch } from 'react-redux';
import { categoryActions } from './redux/reducers/categorySlice'
import { userActions } from './redux/reducers/userSlice'

import authApi from './api/authApi';
import { orderDetailActions } from './redux/reducers/orderDetailSlice';
import ConfirmInformation from './Components/Cart/confirm';
import ProductDetail from './Components/Product/detail';
import History from './Components/History';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const orderDetails = localStorage.getItem("orderDetails");
    if (orderDetails) {
      const detailsParse: OrderDetail[] = JSON.parse(orderDetails);
      dispatch(orderDetailActions.setOrderDetails(detailsParse))
    }
    const language = localStorage.getItem("language");
    if (language) {
      localStorage.setItem("language", "vi");
    }
  }, []);

  useEffect(() => {
    categoryApi.getMany().then((data: any) => {
      dispatch(categoryActions.setCategories(data.list));
    }).catch(e => console.log('Connection failed: ', e));

    const token = localStorage.getItem("token");
    if (token) {
      authApi.profile().then((data) => {
        dispatch(userActions.setUserInfo(data));
      }).catch((e) => {
        localStorage.removeItem("token");
        toast.error(e.message);
      })
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/login" element={<Auth><Login /></Auth>} />
        <Route path="/register" element={<Auth><Register /></Auth>} />
        <Route path="/" element={<Home><HomePage /></Home>} />
        <Route path="/cart" element={<Home><Cart /></Home>} />
        <Route path="/cart/success" element={<Home><ConfirmInformation /></Home>} />
        <Route path="/profile" element={<Home><Profile /></Home>} />
        <Route path="/product" element={<Home><Product /></Home>} />
        <Route path="/product/:id" element={<Home><ProductDetail /></Home>} />
        <Route path="/product/category/:id" element={<Home><ProductCategory /></Home>} />
        <Route path="/payment" element={<Home><Payment /></Home>} />
        <Route path="/home" element={<Home><HomePage /></Home>} />
        <Route path="/contact" element={<Home><Contact /></Home>} />
        <Route path="/history" element={<Home><History /></Home>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;

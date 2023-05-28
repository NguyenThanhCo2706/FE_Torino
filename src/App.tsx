import React, { useEffect } from 'react';
import './App.css';
import PrimarySearchAppBar from './Components/Header';
import RecipeReviewCard from './Commons/ProductCart';
import Login from './Components/login';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './Commons/NotFound';
import { Home } from './Components/Home';
import { Cart } from './Components/Cart';
import { Profile } from './Components/Profile';
import { Product } from './Components/Product';
import { Detail } from './Components/Product/detail';
import { Category } from './Components/Product/category';
import { Payment } from './Components/Cart/payment';
import { HomePage } from './Components/Home/HomePage';
import { Contact } from './Components/contact';
import { Order } from './types';
import { Modal } from './Commons/Modal';

function App() {
  useEffect(() => {
    const order = localStorage.getItem("order");
    if (!order) {
      const dataOrder: Order = {
        note: "",
        dateOfReceive: new Date(),
        discount: 0,
        totalPrice: 0,
        isPaid: 0,
        orderDetails: [],
      }
      localStorage.setItem("order", JSON.stringify(dataOrder));
    }
    console.log(order);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home><HomePage /></Home>} />
        <Route path="/cart" element={<Home><Cart /></Home>} />
        <Route path="/profile" element={<Home><Profile /></Home>} />
        <Route path="/product" element={<Home><Product /></Home>} />
        <Route path="/product/:id" element={<Home><Detail /></Home>} />
        <Route path="/product/category/:id" element={<Home><Category /></Home>} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/home" element={<Home><HomePage /></Home>} />
        <Route path="/contact" element={<Home><Contact /></Home>} />
        <Route path="/new" element={<Modal />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './Commons/NotFound';
import { Home } from './Components/Home';
import { Cart } from './Components/Cart';
import { Profile } from './Components/Profile';
import { Product } from './Components/Product';
import { Detail } from './Components/Product/detail';
import { ProductCategory } from './Components/Product/category';
import { Payment } from './Components/Cart/payment';
import { HomePage } from './Components/Home/HomePage';
import { Contact } from './Components/contact';
import { Category, Order } from './types';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { ToastContainer } from 'react-toastify';
import categoryApi from './api/categoryApi';
import Auth from './Components/Auth';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import { useDispatch } from 'react-redux';
import { categoryActions } from './redux/reducers/categorySlice'
import { userActions } from './redux/reducers/userSlice'

import authApi from './api/authApi';

function App() {
  useEffect(() => {
    const order = localStorage.getItem("order");
    if (!order) {
      const dataOrder: Order = {
        note: "",
        dateOfReceive: new Date(),
        discount: 0,
        totalPrice: 0,
        isPaid: false,
        orderDetails: [],
      }
      localStorage.setItem("order", JSON.stringify(dataOrder));
    }
    const language = localStorage.getItem("language");
    if (language) {
      localStorage.setItem("language", "vi");
    }
  }, []);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:6205/hub/notification')
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(result => {
        console.log('Connected!');

        connection.on('ReceiveMessage', message => {
          // const updatedChat = [...latestChat.current];
          // updatedChat.push(message);

          // setChat(updatedChat);
          console.log(message);

        });
      })
      .catch(e => console.log('Connection failed: ', e));
  }, [])

  const dispatch = useDispatch();
  useEffect(() => {
    categoryApi.getMany().then((data: any) => {
      dispatch(categoryActions.setCategories(data.list));
    }).catch(e => console.log('Connection failed: ', e));

    const token = localStorage.getItem("token");
    if (token) {
      authApi.profile().then((data) => {
        console.log(data);
        dispatch(userActions.setUserInfo(data));
      }).catch((e) => {
        localStorage.removeItem("token");
        console.log(e);
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
        <Route path="/profile" element={<Home><Profile /></Home>} />
        <Route path="/product" element={<Home><Product /></Home>} />
        <Route path="/product/:id" element={<Home><Detail /></Home>} />
        <Route path="/product/category/:id" element={<Home><ProductCategory /></Home>} />
        <Route path="/payment" element={<Home><Payment /></Home>} />
        <Route path="/home" element={<Home><HomePage /></Home>} />
        <Route path="/contact" element={<Home><Contact /></Home>} />
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

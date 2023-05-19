import React, { useEffect } from 'react';
import './App.css';
import PrimarySearchAppBar from './Components/Header';
import RecipeReviewCard from './Commons/ProductCart';
import { Box, CircularProgress, Container, Grid, Pagination } from '@mui/material';
import { SwiperCustom } from './Components/SwiperCustom';
import { Footer } from './Components/footer';
import Login from './Components/login';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './Commons/NotFound';
import { Home } from './Components/Home';
import { Modal } from './Commons/Modal';
import { LinearProgress } from '@mui/material';
import { Cart } from './Components/Cart';
import { ProductDetail } from './Commons/ProductDetail';
import { Profile } from './Components/Profile';
import { Product } from './Components/Product';
import { Detail } from './Components/Product/detail';
import { Category } from './Components/Product/category';

const slides = [
  "https://i.ibb.co/ncrXc2V/1.png",
  "https://i.ibb.co/B3s7v4h/2.png",
  "https://i.ibb.co/XXR8kzF/3.png",
  "https://i.ibb.co/yg7BSdM/4.png"
]

function App() {
  useEffect(() => {
    const order = localStorage.getItem("order");
    if (!order) {
      const dataOrder = {
        note: "",
        dateOfReceive: "",
        orderDetails: [
        ],
      }
      localStorage.setItem("order", JSON.stringify(dataOrder));
    }
    console.log(order);

  }, []);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home><Product /></Home>} />
        <Route path="/cart" element={<Home><Cart /></Home>} />
        <Route path="/profile" element={<Home><Profile /></Home>} />
        <Route path="/product/:id" element={<Home><Detail /></Home>} />
        <Route path="/product/category/:id" element={<Home><Category /></Home>} />

        <Route path="*" element={<NotFound />} />

        {/* {
          validToken ?
            <>
              <Route
                path="/home"
                element={<Main />}
              />
              <Route
                path="/home/profile"
                element={<Home><Profile myPhone={phone} setAvatar={setAvatar} /></Home>}
              />
              <Route
                path="/home/order"
                element={<Home><Order myPhone={phone} /></Home>}
              />
              <Route
                path="/home/map"
                element={<Home><Map /></Home>}
              />
              <Route
                path="/home/history"
                element={<Home><History /></Home>}
              />
              <Route
                path="/home/history/detail/:id"
                element={<Detail />}
              />
              <Route
                path="/home/chat"
                element={<Chat myPhone={phone} />}
              />
              <Route path="/home/chat/:yourPhone" element={
                <Chat myPhone={phone}
                  children={<ChildChat myPhone={phone} />}
                />
              }
              />
            </>
            :
            <></>
        } */}
      </Routes>
    </>
  );
}

export default App;

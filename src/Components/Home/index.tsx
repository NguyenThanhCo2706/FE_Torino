import { Container, Grid, Pagination } from "@mui/material"
import PrimarySearchAppBar from "../Header"
import { SwiperCustom } from "../SwiperCustom"
import { Category } from "../category"
import React, { useEffect, useState } from "react"
import { Footer } from "../footer"
import productApi from "../../api/productApi"
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom"
import Navbar from "../Navbar/Navbar"
import categoryApi from "../../api/categoryApi"
import ProductCart from "../../Commons/ProductCart"

export const Home = (props: any) => {

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // setLoading(true);
    // productApi.getMany()
    //   .then((data) => {
    //     console.log(data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     // alert(err);
    //   })
    categoryApi.getMany()
      .then((data) => {
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        // alert(err);
      })
  }, [])
  return (
    <>
      <PrimarySearchAppBar />
      <Navbar />
      {props.children}

      <Footer />
      {
        loading && <CircularProgressCustom />
      }
    </>
  )
}
import { Breadcrumbs, Pagination, Typography } from "@mui/material"
import ProductCart from "../../Commons/ProductCart"
import { SwiperCustom } from "../../Commons/SwiperCustom"
import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import React from "react";
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';


export const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    productApi.getMany(1).then((data: any) => {
      data && setProducts(data.list);
      setLoading(false);
    })
  }, [])
  return (
    <>
      <SwiperCustom />
      <Navbar />

      {/* <div className="container mx-auto">
        
        <div className="bg-lime-50 mt-2">
          <Grid
            container
            // spacing={3}
            sx={{
              padding: "20px",
            }}
          >
            {
              products.map((product, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <Grid item xs className="text-center">
                      <ProductCart product={product} />
                    </Grid>
                  </React.Fragment>
                )
              })
            }
          </Grid>
        </div>
      </div> */}
      <div className="bg-gray-50 pt-1">
        <div className="container mx-auto">
          <div className="text-[20px]">
            <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "20px", paddingTop: "20px" }}>
              <HomeIcon />
              <Link color="inherit" to="/">
                Home
              </Link>
              <Link
                color="inherit"
                to="/material-ui/getting-started/installation/"
              >
                Product
              </Link>
              <Typography color="text.primary" sx={{ fontSize: "20px" }}>Breadcrumbs</Typography>
            </Breadcrumbs>
          </div>
          <div className="block-line">
            <h2 className="block-line-text bg-gray-50">SẢN PHẨM MỚI NHẤT</h2>
          </div>
          <div className="flex flex-wrap">
            {
              products.map((product, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <div className="w-1/4">
                      <ProductCart product={product} />
                    </div>
                  </React.Fragment>
                )
              })
            }
          </div>
          <div className="flex justify-center p-5">
            <Pagination count={10} variant="outlined" shape="rounded" />
          </div>
        </div>
      </div>
      {
        loading && <CircularProgressCustom />
      }
    </>
  )
}
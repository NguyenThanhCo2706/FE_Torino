import { Grid, Pagination } from "@mui/material"
import ProductCart from "../../Commons/ProductCart"
import { SwiperCustom } from "../SwiperCustom"
import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import React from "react";
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom";


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
      <div className="container mx-auto">
        <div className="block-line">
          <h2 className="block-line-text">SẢN PHẨM MỚI NHẤT</h2>
        </div>
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

        <div className="flex justify-center p-5">
          <Pagination count={10} variant="outlined" shape="rounded" />
        </div>
      </div>
      {
        loading && <CircularProgressCustom />
      }
    </>
  )
}
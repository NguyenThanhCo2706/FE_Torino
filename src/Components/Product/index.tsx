import { Breadcrumbs, Pagination, Typography } from "@mui/material"
import ProductCart from "../../Commons/ProductCart"
import { SwiperCustom } from "../../Commons/SwiperCustom"
import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import React from "react";
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';


export const Product = () => {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    productApi.getMany(0, currentPage, 12).then((data: any) => {
      data && setProducts(data.list);
      setTotalPage(data.paging.totalPages);
      setLoading(false);
    })
  }, [currentPage])
  console.log(currentPage);

  const handleChangePage = (event: any, value: number) => {
    console.log(currentPage, value);

    setCurrentPage(+value);
  }
  return (
    <>
      <SwiperCustom />
      <Navbar />
      <div className="bg-gray-50 pt-1">
        <div className="container mx-auto">
          <div className="text-[20px]">
            <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "18px", paddingTop: "20px" }}>
              <div className=""> <HomeIcon /></div>
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link
                to="/product"
                className="hover:underline"
              >
                Product
              </Link>
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
            <Pagination
              onChange={handleChangePage}
              count={totalPage} variant="outlined" shape="rounded" />
          </div>
        </div>
      </div>
      {
        loading && <CircularProgressCustom />
      }
    </>
  )
}
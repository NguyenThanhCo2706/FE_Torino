import { Breadcrumbs, Card, Grid, Pagination } from "@mui/material"
import ProductCart from "../../Commons/ProductCart"
import { SwiperCustom } from "../../Commons/SwiperCustom"
import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import React from "react";
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from "react-i18next";

export const Product = () => {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    productApi.getMany(0, currentPage, 10).then((data: any) => {
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

  const { t } = useTranslation();

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
                {t('product.home')}
              </Link>
              <Link
                to="/product"
                className="hover:underline"
              >
                {t('product.product')}
              </Link>
            </Breadcrumbs>
          </div>
          <div className="block-line">
            <h2 className="block-line-text bg-gray-50">{t('product.newProduct')}</h2>
          </div>
          <Grid container spacing={6}>
            {products.map((product, index: number) => {
              return (
                <Grid item xs={12} lg={6}>
                  <Card
                    className={`${index % 2 === 0 ? "!pe-4" : "!ps-4"} !p-4`}
                    key={index}
                  >
                    <ProductCart product={product} />
                  </Card>
                </Grid>
              );
            })}
          </Grid>
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
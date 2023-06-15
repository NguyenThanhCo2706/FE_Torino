import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumbs, Pagination, Typography } from "@mui/material"

import HomeIcon from '@mui/icons-material/Home';
import ProductCart from "../../Commons/ProductCart"
import { SwiperCustom } from "../../Commons/SwiperCustom"
import productApi from "../../api/productApi";
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Category } from "../../types";
import { useTranslation } from "react-i18next";


export const ProductCategory = () => {
  const params: any = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { categories } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    productApi.getMany(params.id, currentPage, 12).then((data: any) => {
      data && setProducts(data.list);
      setTotalPage(data.paging.totalPages);
      setLoading(false);
    })
  }, [params, currentPage])

  const handleChangePage = (event: any, value: number) => {
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
              <Typography color="text.primary" sx={{ fontSize: "18px" }}>{
                categories && categories.find((item: Category) => item.id === +params.id)?.name
              }</Typography>
            </Breadcrumbs>
          </div>
          <div className="block-line">
            <h2 className="block-line-text bg-gray-50 uppercase">{
              categories && categories.find((item: Category) => item.id === +params.id)?.name
            }</h2>
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

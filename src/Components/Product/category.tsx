import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumbs, Card, Grid, Pagination, Typography } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import ProductCart from "../../Commons/ProductCart";
import { SwiperCustom } from "../../Commons/SwiperCustom";
import productApi from "../../api/productApi";
import { CircularProgressCustom } from "../../Commons/CircularProgressCustom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
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
    productApi.getMany(params.id, currentPage, 10).then((data: any) => {
      data && setProducts(data.list);
      setTotalPage(data.paging.totalPages);
      setLoading(false);
    });
  }, [params, currentPage]);

  const handleChangePage = (event: any, value: number) => {
    setCurrentPage(+value);
  };

  const { t } = useTranslation();

  const getNameCategory = (id: number) => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === id) {
        return categories[i].name;
      } else {
        for (let j = 0; j < categories[i].childCategories.length; j++) {
          if (categories[i].childCategories[j].id === id) {
            return categories[i].childCategories[j].name;
          }
        }
      }
    }
    return "";
  };

  return (
    <>
      <SwiperCustom />
      <Navbar />
      <div className="bg-gray-50 pt-1">
        <div className="lg:container mx-auto">
          <div className="text-[20px]">
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{ fontSize: "18px", paddingTop: "20px" }}
            >
              <div className="">
                {" "}
                <HomeIcon />
              </div>
              <Link to="/" className="hover:underline">
                {t("product.home")}
              </Link>
              <Link to="/product" className="hover:underline">
                {t("product.product")}
              </Link>
              <Typography color="text.primary" sx={{ fontSize: "18px" }}>
                {categories && getNameCategory(+params.id)}
              </Typography>
            </Breadcrumbs>
          </div>
          <div className="block-line">
            <h2 className="block-line-text bg-gray-50 uppercase">
              {categories && getNameCategory(+params.id)}
            </h2>
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
          <div className="flex justify-center mt-5 p-5">
            <Pagination
              onChange={handleChangePage}
              count={totalPage}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </div>
      </div>
      {loading && <CircularProgressCustom />}
    </>
  );
};

import Header from "../Header"
import React, { useEffect, useState } from "react"
import { Footer } from "../footer"
import categoryApi from "../../api/categoryApi";
import { Category } from "../../types";
import { toast } from "react-toastify";
import { ERROR_MESSAGES } from "../../constraint";
import { useTranslation } from "react-i18next";

export const Home = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    categoryApi.getMany().then((data: any) => {
      setCategories(data.list.sort((a: Category, b: Category) => b.childCategories.length - a.childCategories.length));
    }).catch((err) => {
      toast.error(t("message.serverInternalError"));
    })
  }, [])
  return (
    <>
      <Header categories={categories} />
      {props.children}
      <Footer />
    </>
  )
}

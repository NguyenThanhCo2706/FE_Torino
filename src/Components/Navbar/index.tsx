import { useEffect, useState } from "react";
import categoryApi from "../../api/categoryApi";
import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../../types";

const Navbar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    categoryApi.getMany().then((data: any) => {
      setCategories(data.list.sort((a: Category, b: Category) => b.childCategories.length - a.childCategories.length));
    }).catch((err) => {

    })
  }, [])
  return (
    <>
      <div className="container mx-auto flex flex-row justify-between p-[20px]">
        {
          categories.map((category, index: number) => (
            <div className="relative" key={index}>
              <Link to={`/product/category/${category.id}`} className="peer h-[100px] flex flex-row items-center hover:cursor-pointer border-b-[2px]">
                <img
                  className="w-[60px] h-[60px] object-cover rounded-[10px]"
                  src={category.imageUrl} alt="" />
                <span className="p-3 text-xl font-bold">{category.name}</span>
              </Link>
              <div className="absolute hidden peer-hover:flex hover:flex w-full flex-col bg-white drop-shadow-lg z-10">
                {
                  category.childCategories.map((childCategory, index) => (
                    <Link
                      key={index}
                      to={`/product/category/${childCategory.id}`}
                      className="px-5 py-3 hover:bg-gray-200 hover:cursor-pointer font-semibold"
                    >{childCategory.name}</Link>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Navbar;

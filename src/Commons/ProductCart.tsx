import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { thousandSeparator } from "../utils";
import "react-toastify/dist/ReactToastify.css";
import { OrderDetail } from "../types";
import { orderDetailActions } from "../redux/reducers/orderDetailSlice";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import HouseIcon from "@mui/icons-material/House";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function ProductCard(props: any) {
  const { product } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const disPatch = useDispatch();

  const handleAddCart = () => {
    const orderDetail: OrderDetail = {
      productId: product.id,
      productName: product.name,
      categoryName: product.categoryName,
      productImage: product.images[0],
      quantity: 1,
      price: product.price,
    };
    disPatch(orderDetailActions.addOrderDetail(orderDetail));
    toast.success(t("message.cart.successAdd"));
  };
  return (
    <div className="grid grid-cols-[200px_1fr]">
      <div className="flex justify-center">
        <div
          className="relative w-[200px] h-full group hover:cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img
            className="rounded-[100%] mx-auto w-[200px] h-[200px] object-cover absolute top-1/2 -translate-y-1/2 left-0 right-0 group-hover:opacity-0 group-hover:invisible transition-all duration-1000"
            src={product?.images[0]}
            alt=""
          />
          <img
            className="rounded-[100%] mx-auto w-[200px] h-[200px] object-cover absolute top-1/2 -translate-y-1/2 left-0 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-1000"
            src={product?.images[1]}
            alt=""
          />
        </div>
      </div>
      <div className="ms-10 truncate overflow-hidden">
        <div className="border-b truncate overflow-hidden">
          <p
            className="font-semibold text-[20px] hover:underline hover:cursor-pointer break-normal break-all truncate overflow-hidden"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {product.name}
          </p>
          <p className="italic">{product.categoryName}</p>
          <div className="my-5">
            <span>
              {t("productCart.from")}{" "}
              <span className="font-semibold">
                {thousandSeparator(product.price)}
              </span>{" "}
              VND
            </span>
            <span className="mx-2">|</span>
            <span className="text-[16px]">{t("productCart.shippable")}</span>
          </div>
        </div>
        <div>
          <div className="my-2">
            <DirectionsBikeIcon />
            <span className="ms-4">{t("productCart.ship")}</span>
          </div>
          <div className="my-2">
            <HouseIcon />
            <span className="ms-4">{t("productCart.store")}</span>
          </div>
        </div>
        <div className="flex text-[20px]">
          <button
            onClick={handleAddCart}
            className="border-2 py-1 px-3 hover:bg-green-700 hover:border-green-600 hover:text-white"
          >
            {t("productCart.add")}
          </button>
          <button className="border-2 py-1 px-2 ms-3">
            <FavoriteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
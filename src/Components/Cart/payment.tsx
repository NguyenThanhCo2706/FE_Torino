import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"
import { useTranslation } from "react-i18next";
import commonApi from "../../api/commonApi";
import Success from "./success";
import Failure from "./failure";

export const Payment = () => {
  const [searchParams,] = useSearchParams(window.location.pathname);
  const [code, setCode] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    const orderId = searchParams.get("vnp_TxnRef");
    if (orderId) {
      commonApi.checkPayment(+orderId).then((data: any) => {
        setCode(data.vnp_TransactionStatus)
      })
    }
  }, []);

  return (
    <div className="container mx-auto">
      {
        code === "" ? <div className="h-[500px]"></div> : code === "00" ? <Success searchParams={searchParams} /> : <Failure />
      }
      <div className="py-3 text-center my-3	">
        <Link to={"/product"} className="font-[600] underline p-3 border-2 text-blue-700 hover:border-[#2439fa]">{t('cart.back')}</Link>
      </div>
    </div>
  )
}

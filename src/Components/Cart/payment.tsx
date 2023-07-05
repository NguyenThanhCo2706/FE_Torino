import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { useTranslation } from "react-i18next";
import commonApi from "../../api/commonApi";
import Success from "./success";
import Failure from "./failure";
import { Button } from "@mui/material";

export const Payment = () => {
  const [searchParams,] = useSearchParams(window.location.pathname);
  const [code, setCode] = useState<string>("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const orderId = searchParams.get("vnp_TxnRef");
    if (orderId) {
      commonApi.checkPayment(+orderId).then((data: any) => {
        setCode(data.vnp_TransactionStatus)
      })
    }
  }, []);

  return (
    <div className="container mx-auto mb-10">
      {
        code === "" ? <div className="h-[500px]"></div> : code === "00" ? <Success searchParams={searchParams} /> : <Failure />
      }
      <div className="flex items-center gap-x-8 justify-center">
        <Button
          variant="contained"
          className="!bg-white !text-green-700 !capitalize "
          onClick={() => navigate("/")}
        >
          {t('payment.home')}
        </Button>
        <Button
          variant="contained"
          className="!bg-green-700 !text-white !capitalize"
          onClick={() => navigate("/product")}
        >
          {t('payment.continue')}
        </Button>
      </div>
    </div>
  )
}

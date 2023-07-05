import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ConfirmInformation = (props: any) => {
  const { id } = useParams()
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col text-green-700 items-center text-center justify-center gap-y-6 my-20">
      <CheckCircleIcon
        sx={{ fontSize: "80px" }}
        style={{
          color: "green",
        }}
      />
      <h1 className="font-bold text-[40px] ">{t('payment.success')}</h1>
      <p className="italic font-semibold ">
        <span className="underline me-1">{t('payment.orderId')}:</span>
        {id}</p>
      <div>
        <p>{t('payment.content1')}</p>
        <p>{t('payment.content2')}</p>
        <p>{t('payment.content3')} 0932. 456789</p>
      </div>
      <div className="flex items-center gap-x-8">
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
  );
};

export default ConfirmInformation;

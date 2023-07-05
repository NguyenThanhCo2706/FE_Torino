import { useTranslation } from "react-i18next";
import { thousandSeparator } from "../../utils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment";

const Success = (props: any) => {
  const { searchParams } = props;
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full max-w-[800px] mx-auto flex flex-col text-green-700 items-center text-center justify-center gap-y-6 my-10">
        <CheckCircleIcon
          sx={{ fontSize: "80px" }}
          style={{
            color: "green",
          }}
        />
        <h1 className="font-bold text-[40px] ">{t('payment.success')}</h1>
        <p className="italic font-semibold ">
          <span className="underline me-1">{t('payment.orderId')}:</span>
          {searchParams.get("vnp_TxnRef")}
        </p>
        <div className="flex justify-center">
          <table >
            <tbody className="spacing-10">
              <tr>
                <td>{t('payment.translationId')}:</td>
                <td>{searchParams.get("vnp_TxnRef")}</td>
              </tr>
              <tr>
                <td>{t('payment.amount')}:</td>
                <td>{thousandSeparator(searchParams.get("vnp_Amount") / 100)} VND</td>
              </tr>
              <tr>
                <td>{t('payment.bankName')}:</td>
                <td>{searchParams.get("vnp_BankCode")}</td>
              </tr>
              <tr>
                <td>{t('payment.translationCode')}:</td>
                <td>{searchParams.get("vnp_TransactionNo")}</td>
              </tr>
              <tr>
                <td>{t('payment.datePayment')}: </td>
                <td>{searchParams.get("vnp_PayDate")}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p>{t('payment.content1')}</p>
          <p>{t('payment.content2')}</p>
          <p>{t('payment.content3')} 0932. 456789</p>
        </div>
      </div>
    </>
  )
}

export default Success
import { useTranslation } from "react-i18next";
import { thousandSeparator } from "../../utils";

const Success = (props: any) => {
  const { searchParams } = props;
  const { t } = useTranslation();

  return (
    <>
      <div className=" flex justify-center my-3">
        <img
          className="text-center w-[250px]"
          src="https://maxkiwi.vn/wp-content/uploads/2018/01/success-green-check-mark.png"
          alt="" />
      </div>
      <p className="text-center text-3xl font-semibold my-4">{t('payment.success')}</p>

      <div className="flex justify-center">
        <table >
          <tbody className="spacing-10">
            <tr>
              <td>{t('payment.orderId')}</td>
              <td>{searchParams.get("vnp_TxnRef")}</td>
            </tr>
            <tr>
              <td>{t('payment.translationId')}</td>
              <td>{searchParams.get("vnp_TxnRef")}</td>
            </tr>
            <tr>
              <td>{t('payment.amount')}</td>
              <td>{thousandSeparator(searchParams.get("vnp_Amount"))} VND</td>
            </tr>
            <tr>
              <td>{t('payment.bankName')}</td>
              <td>{searchParams.get("vnp_BankCode")}</td>
            </tr>
            <tr>
              <td>{t('payment.translationCode')}</td>
              <td>{searchParams.get("vnp_TransactionNo")}</td>
            </tr>
            <tr>
              <td>{t('payment.datePayment')}</td>
              <td>{searchParams.get("vnp_PayDate")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Success
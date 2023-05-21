import { Link, useParams, useSearchParams } from "react-router-dom"

export const Payment = () => {
  const [searchParams, setSearchParams] = useSearchParams(window.location.pathname);
  console.log(searchParams.get("vnp_Amount"));

  return (
    <>
      Kết quả thanh toán
      Giao dịch được thực hiện thành công. Cảm ơn quý khách đã sử dụng dịch vụ
      Mã Website (Terminal ID): {searchParams.get("vnp_TmnCode")}
      Mã giao dịch thanh toán: {searchParams.get("vnp_TxnRef")}
      Mã giao dịch tại VNPAY: {searchParams.get("vnp_TransactionNo")}
      Số tiền thanh toán (VND): {searchParams.get("vnp_Amount")}
      Ngân hàng thanh toán: {searchParams.get("vnp_BankCode")}
      <Link to={"/cart"} >Tiếp tục mua hàng</Link>
    </>
  )
}
  
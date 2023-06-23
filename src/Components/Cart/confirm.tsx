// import { useEffect, useState } from "react";
// import { Link, useSearchParams } from "react-router-dom"
// import { useTranslation } from "react-i18next";
// import commonApi from "../../api/commonApi";
// import { thousandSeparator } from "../../utils";

// const ConfirmInformation = (props: any) => {
//   const { order } = props;
//   const { t } = useTranslation();

//   useEffect(() => {

//   }, []);

//   return (
//     <div className="container mx-auto">
//       <div className=" flex justify-center my-3">
//         <img
//           className="text-center w-[250px]"
//           src="https://maxkiwi.vn/wp-content/uploads/2018/01/success-green-check-mark.png"
//           alt="" />
//       </div>
//       <p className="text-center text-3xl font-semibold my-4">{t('payment.success')}</p>

//       <div className="flex justify-center">
//         <table >
//           <tbody className="spacing-10">
//             <tr>
//               <td>{t('payment.orderId')}</td>
//               <td>00101</td>
//             </tr>
//             <tr>
//               <td>{t('payment.orderId')}</td>
//               <td>Tại quầy</td>
//             </tr>
//             <tr>
//               <td>{t('payment.amount')}</td>
//               <td>{thousandSeparator(100000)} VND</td>
//             </tr>
//             <tr>
//               <td>{t('payment.bankName')}</td>
//               <td>2001-01-01</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div className="py-3 text-center my-3	">
//         <Link to={"/product"} className="font-[600] underline p-3 border-2 text-blue-700 hover:border-[#2439fa]">{t('cart.back')}</Link>
//       </div>
//     </div>
//   )
// }

// export default ConfirmInformation;


import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

export const ConfirmInformation = (props: any) => {
  const { id } = props;
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col text-green-700 items-center text-center justify-center gap-y-6 my-10">
      <CheckCircleIcon
        sx={{ fontSize: "80px" }}
        style={{
          color: "green",
        }}
      />
      <h1 className="font-bold text-[40px] ">Đặt hàng thành công</h1>
      <p className="underline italic font-semibold ">Mã Đơn hàng: {id}</p>
      <div>
        <p>Chúng tôi sẽ liên hệ với bạn trong 2h để xác nhận đơn hàng.</p>
        <p>
          Đơn hàng sẽ được xác nhận sau khi nhân viên chúng tôi xác minh đơn
          hàng thành công.
        </p>
        <p>Mọi thắc mắc xin vui lòng liên hệ: 0932. 456789</p>
      </div>
      <div className="flex items-center gap-x-8">
        <Button
          variant="contained"
          className="!bg-white !text-green-700 !capitalize "
          onClick={() => navigate("/")}
        >
          Trở về trang chủ
        </Button>
        <Button
          variant="contained"
          className="!bg-green-700 !text-white !capitalize"
          onClick={() => navigate("/product")}
        >
          Mua thêm sản phẩm
        </Button>
      </div>
    </div>
  );
};

export default ConfirmInformation;

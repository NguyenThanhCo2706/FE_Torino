import { useState } from "react";
import { thousandSeparator } from "../../utils";
import { Card, Pagination } from "@mui/material";
import { useTranslation } from "react-i18next";

const History = () => {
  const [status, setStatus] = useState(1);
  const { t } = useTranslation();

  return (
    <>
      <div className="container mx-auto my-[20px]">
        <div className="flex justify-start w-full text-[40px] mb-3 font-semibold text-green-600">
          {t("history.history")}
        </div>
        <div className="flex p-1 text-xl w-full ">
          <div
            className={`px-4 py-2 hover:cursor-pointer border-[#385D36] ${status === 1 ? "text-[#385D36] border-2 border-b-0 font-semibold" : "border-b-2"} whitespace-nowrap`}
            onClick={() => setStatus(1)}
          >{t("history.all")}</div>
          <div
            className={`px-4 py-2 hover:cursor-pointer border-[#385D36] ${status === 2 ? "text-[#385D36] border-2 border-b-0 font-semibold" : "border-b-2"} whitespace-nowrap`}
            onClick={() => setStatus(2)}
          >{t("history.pending")}</div>
          <div
            className={`px-4 py-2 hover:cursor-pointer border-[#385D36] ${status === 3 ? "text-[#385D36] border-2 border-b-0 font-semibold" : "border-b-2"} whitespace-nowrap`}
            onClick={() => setStatus(3)}
          >{t("history.confirm")}</div>
          <div
            className={`px-4 py-2 hover:cursor-pointer border-[#385D36] ${status === 4 ? "text-[#385D36] border-2 border-b-0 font-semibold" : "border-b-2"} whitespace-nowrap`}
            onClick={() => setStatus(4)}
          >{t("history.complete")}</div>
          <div
            className={`px-4 py-2 hover:cursor-pointer border-[#385D36] ${status === 5 ? "text-[#385D36] border-2 border-b-0 font-semibold" : "border-b-2"} whitespace-nowrap`}
            onClick={() => setStatus(5)}
          >{t("history.cancel")}</div>
          <div className="w-full border-b-2 border-[#385D36]"></div>
        </div>
        <Card className="!px-10 !mt-5">

          <div className="my-5 border-b-2">
            <div className="italic text-gray-600 font-medium">
              <span>{t("history.order")}:</span>
              <span className="text-xl font-semibold">#123</span>
            </div>
            <div className="flex justify-between border-b">
              <span>
                <span className="italic">{t("history.dateOfReceive")}: </span>
                <span className="font-semibold text-[#385D36]">08:00:00 2001-01-01</span>
              </span>
              <span>
                <span className="italic text-[1rem]">{t("history.status")}: </span>
                <span className="text-xl font-semibold text-[#385D36]">Hoàn thành</span>

              </span>
            </div>
            <div>
              <div className="flex items-center py-3">
                <img
                  src="https://torinobucket.s3-ap-southeast-1.amazonaws.com/Products/e705b526-275f-446e-8bcc-b578338ecad0.JPG"
                  alt=""
                  className="w-[80px] h-[80px] object-cover"
                />
                <div className="w-full flex justify-between items-center">
                  <div className="ms-5">
                    <p className="font-semibold text-xl text-[#385D36]">Name</p>
                    <p>x 100</p>
                  </div>
                  <div>
                    {thousandSeparator(100000)} VNĐ
                  </div>
                </div>
              </div>
              <div className="flex items-center py-3">
                <img
                  src="https://torinobucket.s3-ap-southeast-1.amazonaws.com/Products/e705b526-275f-446e-8bcc-b578338ecad0.JPG"
                  alt=""
                  className="w-[80px] h-[80px] object-cover"
                />
                <div className="w-full flex justify-between items-center">
                  <div className="ms-5">
                    <p className="font-semibold text-xl text-[#385D36]">Name</p>
                    <p>x 100</p>
                  </div>
                  <div>
                    {thousandSeparator(100000)} VNĐ
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between py-2">
              <span className="italic">{t("history.deliveryType")}: <span className="font-semibold text-[#385D36]">Giao hàng</span></span>
              <span>{t("history.totalPrice")}: <span className="text-xl font-semibold text-[#385D36]">{thousandSeparator(100000)} VNĐ</span></span>
            </div>
          </div>
        </Card>
        <div className="flex justify-center mt-10">
          <Pagination
            // onChange={handleChangePage}
            // count={totalPage} 
            variant="outlined"
            shape="rounded" />
        </div>
      </div>
    </>
  )
}

export default History;